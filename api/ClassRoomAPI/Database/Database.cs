using ClassRoomAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace ClassRoomAPI
{
    public class Database
    {
        public static IMongoDatabase database { get; set; }
        public static void Create()
        {
            var connectionString = "mongodb://localhost:27017";
            var mongoClient = new MongoClient(connectionString);
            //CreateIndex(mongoClient);
            database = mongoClient.GetDatabase("ClassRoomDB");
        }
    }
}
