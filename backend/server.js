require("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/index')(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening...`);
});
