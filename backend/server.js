import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

//File Imports
import api from './Routes/api';

const PORT = 3000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}) );

//responses from api route
app.use('/api', api)

//Handles landing page
app.get('/', (req, res)=>{
    res.send("Welcome to TTT-app")
})

//Handles missing routes
app.get('**', (req, res)=>{
    res.send("Error 404 - It looks like you are lost.")
})

app.listen(PORT, ()=>{
    console.log(`Listening at PORT: ${PORT}`)
})
