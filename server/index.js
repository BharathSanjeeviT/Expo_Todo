//Instatiating express module
import express from 'express'
const app = express()

//BodyParser
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

import cors from "cors"
app.use(cors())

//Instantiating prisma
import prisma from './prisma/prisma.js'

const PORT = 3000

app.get('/',async (req,res)=>{
    const data = await prisma.todo.findMany()
    res.json(data)
})

app.post('/postTask',async(req,res)=>{
    const body = req.body.task;

    const data = await prisma.todo.create({
        data : {
            task : body
        }
    })

    res.json(data)
})

app.listen(3000,()=>{
    console.log(`Server listening at ${PORT}`)
})
