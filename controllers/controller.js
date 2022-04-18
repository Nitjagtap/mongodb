
const MongoClient = require("../db/db");
const url = "mongodb://localhost:27017/";


class Controller {
    
    static async insert(req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var myobj = [
                    { name: 'John', address: 'Highway 71' },
                    { name: 'Peter', address: 'Lowstreet 4' },
                    { name: 'Amy', address: 'Apple st 652' },
                    { name: 'Hannah', address: 'Mountain 21' },
                    { name: 'Michael', address: 'Valley 345' },
                    { name: 'Sandy', address: 'Ocean blvd 2' },
                    { name: 'Betty', address: 'Green Grass 1' },
                    { name: 'Richard', address: 'Sky st 331' },
                    { name: 'Susan', address: 'One way 98' },
                    { name: 'Vicky', address: 'Yellow Garden 2' },
                    { name: 'Ben', address: 'Park Lane 38' },
                    { name: 'William', address: 'Central st 954' },
                    { name: 'Chuck', address: 'Main Road 989' },
                    { name: 'Viola', address: 'Sideway 1633' }
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


    static async sort(req, res) {
        try {

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var query = { address: "Park Lane 38" };
                dbo.collection("customers").find(query).toArray(function (err, result) {
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