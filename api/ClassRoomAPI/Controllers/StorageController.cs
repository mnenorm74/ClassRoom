using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StorageController : Controller
    {
        public static string storageDirectory = Directory.GetCurrentDirectory() + "\\..\\..\\storage\\";

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
            var filePaths = new List<FilePath>();
            var fileInf = new FileInfo(storageDirectory + decodePath);
            //var filePath = path.Split('\\');
            //if(filePath[filePath.Length-1].Contains('.'))
            if (fileInf.Exists/*Directory.Exists(storageDirectory+path)*/)
            {
                var mas = System.IO.File.ReadAllBytes(fileInf.FullName);
                var fileType = "application/" + fileInf.Extension;
                return File(mas, fileType, fileInf.Name);
            }
            else if (Directory.Exists(storageDirectory + decodePath))
            {
                var dirInfo = new DirectoryInfo(storageDirectory + decodePath);
                var files = dirInfo.GetFiles();
                var directories = dirInfo.GetDirectories();
                // или найти в базе все пути к файлам ??
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
                return new ObjectResult(filePaths);
            }
            return NotFound();
        }


        [HttpGet("last")]
        public IActionResult Get(int count)
        {
            var result = new List<FilePath>();
            //взять из базы все файлы по новизне
            for(var i = 0; i < count; i++)
            {
                result.Add(new FilePath() { Path = "", CreateDate = DateTime.Now.AddDays(i) });
            }
            return new ObjectResult(result);
        }

        [HttpPost("{path}")]
        public IActionResult Post(string path, [FromBody]byte[] file)
        {
            var decodePath = Base64Decode(path);
            var fileInf = new FileInfo(storageDirectory + decodePath);
            var dirInfo = new DirectoryInfo(storageDirectory + decodePath);
            if(file != null && Directory.Exists(fileInf.Directory.FullName))
            {
                System.IO.File.WriteAllBytes(storageDirectory + decodePath, file);
                //добавить в бд
                return Created("/storage/"+path, new FilePath() { Path = decodePath, CreateDate = DateTime.Now});
            }
            else if(Directory.Exists(dirInfo.Parent.FullName))
            {
                dirInfo.Create();
                //добавить в бд
                return Created("/storage/" + path, new FilePath() { Path = decodePath, CreateDate = DateTime.Now });
            }
            return BadRequest();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{path}")]
        public IActionResult Delete(string path)
        {
            var decodePath = Base64Decode(path);
            var fileInf = new FileInfo(storageDirectory + decodePath);
            var dirInfo = new DirectoryInfo(storageDirectory + decodePath);
            if(fileInf.Exists)
            {
                //найти и удалить в базе
                fileInf.Delete();
                return NoContent();
            }
            else if(dirInfo.Exists)
            {
                //найти и удалить в базе
                dirInfo.Delete(true);
                return NoContent();
            }
            return NotFound();
        }
    }
}
