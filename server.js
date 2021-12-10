const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});