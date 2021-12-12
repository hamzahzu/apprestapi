const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//call routes
var routes = require('./routes');
routes(app);

const PORT = 1001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});