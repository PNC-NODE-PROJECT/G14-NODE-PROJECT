require('dotenv').config()
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT=process.env.PORT || 3000;
const questionRouter = require('./routes/questions_route')

app.use(express.json());
app.listen(PORT,()=>console.log("listening on port:"+PORT));

app.use('/api/questions', questionRouter)