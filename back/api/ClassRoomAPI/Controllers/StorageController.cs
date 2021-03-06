﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StorageController : Controller
    {
        public static string storageDirectory = Directory.GetCurrentDirectory() + "\\..\\..\\storage\\";
        private readonly IMongoCollection<FilePath> filesCollection;
        private readonly IMongoCollection<User> usersCollection;
        private readonly IMongoCollection<Models.Group> groupsCollection;
        public StorageController(IMongoDatabase db)
        {
            filesCollection = db.GetCollection<FilePath>("files");
            groupsCollection = db.GetCollection<Models.Group>("groups");
            usersCollection = db.GetCollection<User>("users");
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        [HttpGet("{path}")]
        [Produces("application/json")]
        public IActionResult Get(string path)
        {
            var decodePath = "";
            var user = HttpContext.Session.GetString("userId");
            var currUser = Guid.Parse(user);
            var currGroup = groupsCollection.Find(g => g.Users.Contains(currUser)).FirstOrDefault();
            var newPath = "";
            FileInfo fileInf;
            try
            {
                decodePath = Base64Decode(path).Trim();
                newPath = storageDirectory + currGroup.GroupId + "\\" + decodePath;
                fileInf = new FileInfo(newPath);
            }
            catch (Exception e)
            {
                return UnprocessableEntity("Incorrect value of path: " + e.Message);
            }
            
            
            if (fileInf.Exists)
            {
                var bytesFile = System.IO.File.ReadAllBytes(fileInf.FullName);
                var fileType = "application/" + fileInf.Extension;
                return File(bytesFile, fileType, fileInf.Name);
            }
            else if (Directory.Exists(newPath))
            {
                var dirInfo = new DirectoryInfo(newPath);
                var startPath = currGroup.GroupId.ToString() + '\\' + decodePath;
                var paths = filesCollection.Find(p => p.Path.StartsWith(startPath)/*p.Path.Count(ch=>ch.Equals('\\')) == 1*//*.Contains("\\")*/).ToList();
                paths = paths.Where(a => !a.Path.Skip(startPath.Length + 1).Contains('\\') && startPath.Length != a.Path.Length).ToList();
                
                return new ObjectResult(paths);
            }
            return NotFound("This directory or file was not found");
        }


        [HttpGet("last")]
        [Produces("application/json")]
        public IActionResult Get(int count)
        {
            var userGroupId = usersCollection
                .Find(a => a.Id == Guid.Parse(HttpContext.Session.GetString("userId")))
                .FirstOrDefault()
                .GroupId;
            if (count < 0)
            {
                return UnprocessableEntity("Incorrect value of count: " + count);
            }
            var result = filesCollection.Find(p => p.IsFile == true && p.Path.Contains(userGroupId.ToString()))
                    .SortBy(n => n.CreateDate)
                    .Limit(count)
                    .ToList();
            return new ObjectResult(result);
        }

        
        [HttpPost("{path}")]
        [Produces("application/json")]
        public IActionResult Post(string path, [FromForm]IFormFile file)
        {
            var decodePath = "";
            var currUser = Guid.Parse(HttpContext.Session.GetString("userId"));
            var currGroup = groupsCollection.Find(g => g.Users.Contains(currUser)).FirstOrDefault();
            var newPath = "";
            FileInfo fileInf;
            DirectoryInfo dirInfo;
            try
            {
                decodePath = Base64Decode(path).Trim();
                newPath = storageDirectory + currGroup.GroupId + "\\" + decodePath;
                fileInf = new FileInfo(newPath);
                dirInfo = new DirectoryInfo(newPath);
            }
            catch (Exception e)
            {
                return UnprocessableEntity("Incorrect value of path: " + e.Message);
            }
            if(fileInf.Exists || (dirInfo.Exists && file == null))
            {
                return UnprocessableEntity("An object with this name already exists");
            }
            
            if (file != null && Directory.Exists(fileInf.Directory.FullName))
            {
                var fileS = new FileStream(newPath, FileMode.Create);
                file.CopyTo(fileS);
                var newFile = new FilePath() { Path = currGroup.GroupId + "\\" + decodePath, IsFile = true, CreateDate = DateTime.Now };
                filesCollection.InsertOne(newFile);
                fileS.Close();
                return Created("/storage/"+ path, newFile);
            }
            else if(Directory.Exists(dirInfo.Parent.FullName))
            {
                dirInfo.Create();
                var newDir = new FilePath() { Path = currGroup.GroupId + "\\" + decodePath, IsFile = false, CreateDate = DateTime.Now };
                filesCollection.InsertOne(newDir);
                return Created("/storage/" + path, newDir);
            }
            return BadRequest("This directory or file is invalid");
        }

        [HttpDelete("{path}")]
        [Produces("application/json")]
        public IActionResult Delete(string path)
        {
            var decodePath = "";
            try
            {
                decodePath = Base64Decode(path).Trim();
            }
            catch (Exception e)
            {
                return UnprocessableEntity("Incorrect value of path: " + e.Message);
            }
            if(decodePath == "")
            {
                return BadRequest("Unable to delete root directory");
            }
            var fileInf = new FileInfo(storageDirectory + decodePath);
            var dirInfo = new DirectoryInfo(storageDirectory + decodePath);
            if(fileInf.Exists)
            {
                filesCollection.DeleteOne(f => f.Path == decodePath);
                fileInf.Delete();
                return NoContent();
            }
            else if(dirInfo.Exists)
            {
                filesCollection.DeleteOne(f => f.Path.StartsWith(decodePath));
                dirInfo.Delete(true);
                return NoContent();
            }
            return NotFound("This directory or file was not found");
        }
    }
}
