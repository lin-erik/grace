const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const parser = require('body-parser');
const Clarifai = require('clarifai')
const { CLARIFAI_API, CUSTOM_MODEL_ID } = require('../config')
const sampleData = require('../trainingSample')

const app = express()
/****** express middleware ******/
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
/******* end of middleware ******/

app.use(express.static(__dirname + '/../client/dist'));


const clarifai = new Clarifai.App({
  apiKey: CLARIFAI_API
})

app.post('/api/analyze',(req,res)=>{
  clarifai.models.predict('e0be3b9d6a454f0493ac3a30784001ff', req.body.url).then((response,err)=>{
    if(err) return res.send(err)
    let concepts = response.outputs[0].data.concepts.map(concept=>concept.name)
    res.send(concepts)
  })
})

// app.get('/clarifai/inputs',(req,res)=>{
//   clarifai.inputs.list().then((inputs,err)=>res.send(inputs))
// })

// app.get('/clarifai/model',(req,res)=>{
//   clarifai.models.get(CLARIFAI_API).then((model,err)=>{
//     if(err)return res.send(err)
//     res.send(model)
//   })
// })

// app.post('/clarifai/inputs',(req,res)=>{
//   let imgArr = sampleData["coat"]
//   clarifai.inputs.create(imgArr).then((response,err)=>{
//     if(err) return res.send(err)
//     console.log({response})
//     res.send(response)
//   })
// })

// app.get('/clarifai/train',(req,res)=>{
//   clarifai.models.train(CUSTOM_MODEL_ID).then((model,err)=>{
//     if(err)return res.send(err)
//     res.send(model)
//   })
// })

// app.post('/clarifai/model',(req,res)=>{
//   clarifai.models.create(
//     "fashion",
//     ['t-shirt','dress-shirt','hoodie','jeans','shorts','cardigan','suit-jacket','dress','skirt','coat']
//   ).then(
//     function(response) {
//       // do something with response
//       res.send(response)
//     },
//     function(err) {
//       // there was an error
//     }
//   );
// })



const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server connected on', port))