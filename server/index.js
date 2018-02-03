const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

let port = 3000;
app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});