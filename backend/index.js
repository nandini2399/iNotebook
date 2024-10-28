const connectToMongo = require('./db');
const express = require('express');
const app = express();

connectToMongo();

const PORT = 3000;

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
//app.use('/api/auth',require('./routes/notes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});