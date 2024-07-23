const express = require('express');
const cors = require('cors');
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/index')(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
