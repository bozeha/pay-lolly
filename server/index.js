//Load HTTP module
var dotenv = require('dotenv');

/// for secure connection string
require("dotenv/config");


const cors = require('cors');
const http = require("http");
const express = require('express')
const app = express()

//////// for post 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const hostname = '127.0.0.5';
const port = 3002;
app.use(cors({
    origin: '*'
}));

let dbUrl = process.env.DB_CONNECTION
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(dbUrl)
const connection = client.connect()
const db = client.db("tasks-test")
const collection = db.collection('tasks')

const reConnectDb = () => {
    MongoClient = require('mongodb').MongoClient
    client = new MongoClient(dbUrl)
    connection = client.connect()
    db = client.db("tasks-test")
    collection = db.collection('tasks')
}





app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
app.post('/data', (req, res) => {
    collection.findOne({}, function (err, result) {
        if (err) throw err;
        res.send(result?.data)
    });
})
app.post('/update', async (req, res) => {
    const updatedObj = req.body.obj;
    const idToUpdate = req.body.idToUpdate;
    collection.updateOne({}, { $set: { data: updatedObj } }, function (err, obj) {
        if (err) {
            res.send(err)
        } else {
            res.send(obj)
        }


    })

})
app.post('/remove', async (req, res) => {
    const idToRemove = req.body.id;
    collection.updateOne({ type: "tasksList" }, { $pull: { 'data': { "id": idToRemove } } }, function (err, obj) {
        if (err) {
            console.log(`error`);
            res.send(err)
        } else {
            console.log(`success`);
            res.send("success")
        }
    })
})

app.post('/add', async (req, res) => {
    const taskObj = new Object(req.body.obj);
    console.log(`taskObj:::::::${JSON.stringify(taskObj)}#####`);
    //collection.updateOne({}, { $push: { "data": 95 } });
    collection.updateOne({}, { $push: { 'data': taskObj } }, function (err, obj) {
        if (err) {
            console.log(`error`);
            res.send(err)
        } else {
            console.log(`success`);
            res.send("success")
        }
    }
    )

})




//"mongodb://localhost:27017/";


// MongoClient.connect(dbUrl, function (err, db) {
//     if (err) throw err;
//     var myquery = { $pull: { data: [{ id: 111 }] } };
//     var dbo = db.db("tasks-test");

//     //dbo.collection("tasks").deleteOne({ type: "tasksList" }, { $pull: { data: [] } })
//     // dbo.collection("tasks").remove(myquery, function (err, obj) {
//     //     if (err) {
//     //         console.log(`err::::::${err}####`);
//     //         throw err;
//     //     }
//     //     console.log(obj.result.n + " document(s) deleted");
//     //     db.close();
//     // });
// });