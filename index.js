const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
const app = express()
const port = 5000

// middleware
app.use(cors());
app.use(express.json());
// ZgUM3KawVRrf1CD3
// AYX1a3InuvoNXqAy

const uri = "mongodb+srv://dbnew:AYX1a3InuvoNXqAy@cluster0.b7kaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("test");
    const haiku = database.collection("devices");
    // get api
    app.get('/users',async(req,res)=>{
      const cursors = haiku.find({});
      const users = await cursors.toArray();
      res.send(users)
    })
    // get one data
    app.get('/users/:id',  async(req,res)=>{
      const id = req.params.id
      const query = {_id:ObjectId(id)}
      const user = await haiku.findOne(query);
      res.send(user)
    })
    // post api
    app.post('/users', async(req,res)=>{
      const newUser = req.body
      const result = await haiku.insertOne(newUser);
      console.log('got new user',result)
      console.log('hittting post',req.body)
      res.json(result)
    })
    // update put
    app.put('/users/:id',async(req,res)=>{
      const id = req.params.id
      const updatedUser = req.body;
      const filter = {_id:ObjectId(id)}
      const options = {upsert:true};
      const updateDoc = {
        $set:{
          name:updatedUser.name,
          email:updatedUser.email
        }
      }
      const result = await haiku.updateOne(filter,updateDoc,options)

      console.log('updating user',req)
      res.json(result)
    })
    // delete api
    app.delete('/users/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await haiku.deleteOne(query);
      console.log('delete id',result);
      res.send('delete to go')
    })
    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})