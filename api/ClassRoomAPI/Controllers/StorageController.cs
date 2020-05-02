using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
        public StorageController(IMongoDatabase db)
        {
            filesCollection = db.GetCollection<FilePath>("files");
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
        public IActionResult Get(string path)
        {
            var decodePath = Base64Decode(path);
            var fileInf = new FileInfo(storageDirectory + decodePath);
            fileInf.
            if (fileInf.Exists)
            {
                var bytesFile = System.IO.File.ReadAllBytes(fileInf.FullName);
                var fileType = "application/" + fileInf.Extension;
                return File(bytesFile, fileType, fileInf.Name);
            }
            else if (Directory.Exists(storageDirectory + decodePath))
            {
                var dirInfo = new DirectoryInfo(storageDirectory + decodePath);
                var filePaths = new List<FilePath>();
                var files = dirInfo.GetFiles();
                var directories = dirInfo.GetDirectories();
                // или найти в базе все пути к файлам ??
                var paths = filesCollection.Find(p => dirInfo.FullName.Contains(p.Path)).ToList();
                foreach(var file in files)
                {
                    var splitPath = file.FullName.Split("storage\\");
                    filePaths.Add(new FilePath() { Path = splitPath[1], CreateDate = file.CreationTime });
                }
                foreach (var dir in directories)
                {
                    var splitPath = dir.FullName.Split("storage\\");
                    filePaths.Add(new FilePath() { Path = splitPath[1], CreateDate = dir.CreationTime });
                }
                return new ObjectResult(paths);
            }
            return NotFound();
        }


        [HttpGet("last")]
        public IActionResult Get(int count)
        {
            var result = filesCollection.Find(p => p.IsFile)
                    .SortBy(n => n.CreateDate)
                    .Limit(count)
                    .ToList();
            return new ObjectResult(result);
        }

        [HttpPost("{path}")]
        public IActionResult Post(string path, IFormFile file)
        {
            var decodePath = Base64Decode(path);
            var fileInf = new FileInfo(storageDirectory + decodePath);
            if(file != null && Directory.Exists(fileInf.Directory.FullName))
            {
                using (var fstream = new FileInfo(file.FileName).Create())
                {
                    file.CopyTo(fstream);
                }
                file.OpenReadStream();
                //System.IO.File.WriteAllBytes(storageDirectory + decodePath, file);
                var newFile = new FilePath() { Path = decodePath, IsFile = true, CreateDate = DateTime.Now };
                filesCollection.InsertOne(newFile);
                return Created("/storage/"+path, newFile);
            }
            return BadRequest();
        }

        //[HttpPost]
        //public IActionResult Post([FromBody]string path)
        //{
        //    var decodePath = Base64Decode(path);
        //    var dirInfo = new DirectoryInfo(storageDirectory + decodePath);
        //    if (Directory.Exists(dirInfo.Parent.FullName))
        //    {
        //        dirInfo.Create();
        //        var newDir = new FilePath() { Path = decodePath, IsFile = false, CreateDate = DateTime.Now };
        //        filesCollection.InsertOne(newDir);
        //        return Created("/storage/" + path, newDir);
        //    }
        //    return BadRequest();
        //}


        [HttpDelete("{path}")]
        public IActionResult Delete(string path)
        {
            var decodePath = Base64Decode(path);
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
                filesCollection.DeleteMany(f => f.Path.StartsWith(decodePath));
                dirInfo.Delete(true);
                return NoContent();
            }
            return NotFound();
        }
    }
}
