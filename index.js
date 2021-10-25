const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const port = 5000
// ZgUM3KawVRrf1CD3
// AYX1a3InuvoNXqAy

const uri = "mongodb+srv://dbnew:AYX1a3InuvoNXqAy@cluster0.b7kaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("test");
    const haiku = database.collection("devices");
    // post api
    app.post('/users/add', async(req,res)=>{
      console.log('hittting post',req.body)
      res.send('hit post')
    })
    
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})