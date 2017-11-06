const express = require('express');
const app = express();
const distPath = __dirname + '/dist';

app.use('/data', express.static(__dirname + '/data'));
app.use('/dist', express.static(distPath));

app.get('/', function (request, response) {
    // TODO: Serve from dist!
    response.sendFile(__dirname + '/index.html');
});

app.listen(3000);
