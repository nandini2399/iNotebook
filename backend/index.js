const connectToMongo = require('./db');
const express = require('express');
const app = express();

connectToMongo();

const PORT = 3000;

app.get('/',(req,res)=>{
    res.send("Hey, Nandini")
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});