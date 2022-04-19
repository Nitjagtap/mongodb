
const MongoClient = require("../db/db");
const url = "mongodb://localhost:27017/";


class Controller {
    
    static async insert(req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var myobj = [
                    { name: 'John', address: 'Highway 71' , salary:2000 },
                    { name: 'Peter', address: 'Lowstreet 4' , salary:25000 },
                    { name: 'Amy', address: 'Apple st 652' , salary:26000},
                    { name: 'Hannah', address: 'Mountain 21', salary:23000 },
                    { name: 'Michael', address: 'Valley 345' , salary:26000},
                    { name: 'Sandy', address: 'Ocean blvd 2' , salary:21000},
                    { name: 'Betty', address: 'Green Grass 1' , salary:27000},
                    { name: 'Richard', address: 'Sky st 331' , salary:22000},
                    { name: 'Susan', address: 'One way 98' , salary:29000},
                    { name: 'Vicky', address: 'Yellow Garden 2' , salary:29000},
                    { name: 'Ben', address: 'Park Lane 38', salary:40000 },
                    { name: 'William', address: 'Central st 954' , salary:20000},
                    { name: 'Chuck', address: 'Main Road 989', salary:20500 },
                    { name: 'Viola', address: 'Sideway 1633', salary:30000 }
                ];
                dbo.collection("customers").insertMany(myobj, function (err, result) {
                    if (err) throw err;
                    console.log("Number of documents inserted: " + result.insertedCount);
                    res.send(result)

                    db.close();
                });
            });
        } catch (e) {
            console.log(e)
        }
    }
    static async select(req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result);
                    db.close();
                });
            });

        } catch (e) {
            console.log(e)
        }
    }


    static async aggregate(req, res) {
        try {

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
              //  var query =db.test.aggregate([{ $match: { address: "Park Lane 38"} } ]);
                dbo.collection("customers")
                .aggregate([
                    { 
                      $match: {
                        
                      }
                    }, {
                      $group: {
                        _id: null,
                        total: {
                          $sum: "$salary"
                        },
                        average_transaction_amount: {
                          $avg: "$salary"
                        },
                        min_transaction_amount: {
                          $min: "$salary"
                        },
                        max_transaction_amount: {
                          $max: "$salary"
                        }
                      }
                    }
                  ])
                .toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result);

                    db.close();
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    //sort result ascending(1) or descending(-1)

    static async order(req, res) {
        try {

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var mysort = { name: 1 };
                dbo.collection("customers").find().sort(mysort).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result)
                    db.close();
                });
            });
        } catch (e) {
            console.log(e)
        }
    }

    //delete document

    static async delete(req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var query = { address: 'Mountain 21' };
                dbo.collection("customers").deleteMany(query, function (err, obj) {

                    if (err) throw err;
                    console.log(obj);
                    res.send(obj)
                    db.close();
                });
            });
        } catch (e) {
            console.log(e)

        }
    }

    // update document
    static async update(req, res) {
        try {


            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var myquery = { address: "Valley 345" };
                var newvalues = { $set: { address: "Canyon 123" } };
                dbo.collection("customers").updateMany(myquery, newvalues, function (err, obj) {
                    if (err) throw err;
                    console.log(obj.modifiedCount + " document(s) updated");
                    res.send(obj)
                    db.close();
                });
            });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Controller