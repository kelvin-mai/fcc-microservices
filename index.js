require('dotenv').config();
const port = process.env.port || 4000;

const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./routes');
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use('/api/headers/', routes.headers);
app.use('/api/timestamp/', routes.timestamp);
app.use('/api/metadata/', routes.metadata);
app.use('/api/shorturl/', routes.shorturl);
app.use('/api/imagesearch', routes.imagesearch);
// app.use('/', routes.client);

app.listen(port, (req, res) => console.log(`Server started on ${port}`));
