require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.APP_URL,
    methods: 'GET',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

app.listen(port, () => console.log(`Server running on ${process.env.APP_URL}`));