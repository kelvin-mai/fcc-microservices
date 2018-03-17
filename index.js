require('dotenv').config();
const port = process.env.port || 4000;

const express = require('express'),
	app = express();

const routes = require('./routes');

app.use('/api', routes.api);

app.listen(port, (req, res) => console.log(`Server started on ${port}`));
