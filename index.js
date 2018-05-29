require('dotenv').config();
const port = process.env.port || 4000;

const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./routes');
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use('/api/', routes.api);
app.use('/', routes.client);

app.listen(port, (req, res) => console.log(`Server started on ${port}`));
