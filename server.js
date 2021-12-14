const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//call routes
var routes = require('./routes');
routes(app);

//call routes from index middleware
app.use('/auth', require('./middleware'));

const PORT = 1001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});