const express = require('express');
const cookieParser = require('cookie-parser');
const router = require("./routes");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(router);

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});