const MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost/test";

MongoClient.connect(url,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, 
  function(err, db) {
  if (err) throw err;
  else{
  console.log("Database created!"); 
  }
  db.close();
});


module.exports=MongoClient;