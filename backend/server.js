require("dotenv").config();
const express = require('express');
const cors = require('cors');


const PORT = process.env.PORT;
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/index')(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
