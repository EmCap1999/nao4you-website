const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes');
var cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(router);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});