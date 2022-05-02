require("dotenv").config();
const express = require("express");
const fs = require('fs');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.static("public"));
app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})

app.use(cors({origin:'*'}));



const router = require('./routers/questions_router');
app.use("/api/questions", router);
