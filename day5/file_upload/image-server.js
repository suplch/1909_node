const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'uploads')));



app.listen(8000);
