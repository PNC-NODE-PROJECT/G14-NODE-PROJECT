require("dotenv").config();
const express = require("express");
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})

const listOfQuestionRouter = require('./routers/questions_router');
app.use("/api/questions", listOfQuestionRouter);
