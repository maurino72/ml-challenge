const port = process.env.port || 3001;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(helmet());
app.get('*', cors());
app.options('*', cors());

app.use('' ,routes);

app.listen(port, (err) => {
    if (err) {
        return console.log("Ups!! Something Happend", err);
    }

    console.log(`Server is listening on port ${port}`);
});