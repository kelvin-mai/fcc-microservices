require('dotenv').config();
const port = process.env.port || 4000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const routes = require('./routes');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/headers/', routes.headers);
app.use('/api/timestamp/', routes.timestamp);
app.use('/api/metadata/', routes.metadata);
app.use('/api/shorturl/', routes.shorturl);
app.use('/api/imagesearch', routes.imagesearch);
app.use('/api/exercise/', routes.exercise);
// app.use('/', routes.client);

app.listen(port, (req, res) => console.log(`Server started on ${port}`));
