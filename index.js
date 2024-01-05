const express = require('express');
const cors = require('cors'); 
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId, ISODate } = require('mongodb');
const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://$umsdubai:1Tieyhtu1IRJR0rI@ums.b2w96to.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    console.log('db connected');
    const usersCollection = client.db('ums1').collection('user'); 



    app.get('/api/users', async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query); 
      const hold = await cursor.toArray();
      res.send(hold);
    });
    app.post('/api/users', async (req, res) => {
      const adduser = req.body; 
      const result = await usersCollection.insertOne(adduser);
      res.send(result)
    });
  


    app.put('/api/data/:id', async (req, res) => {
      const id = req.params.id;
      const updatedata = req.body;
      const update1 = updatedata.key;
      const update2 = updatedata.value;
      console.log(updatedata,update1, update2 );
      const palet = { [update1] : update2};

      const filter = { _id: new ObjectId(id) }; 
      const options = { upsert: true };
      const updatedDoc = {
        $set: palet
      };
      const result = await usersCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });



 
    app.delete('/api/userdata/:id', async (req, res) => {
      const id = req.params.id;
      const query =  { _id: new ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })
  } 
  finally {

  }

}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send(`<h1 style="text-align: center;
      color: red;"> Server is Running at <span style="color: Blue;">${port}</span></h1>`);
});

app.listen(port, () => {
  console.log("UMS - User Management System server running at  : ", port);
});


 

 