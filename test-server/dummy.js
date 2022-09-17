const {faker} = require("@faker-js/faker");

const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// todo create a list of messages and return them in the response

app.get('/', (req, res) => {
    const message = faker.lorem.text();
    res.send(message);
});

// todo: add current-user endpoint

app.get('/api/direct-messages', (req, res) => {
    const message1 = faker.lorem.text();
    const message2 = faker.lorem.text();
    res.setHeader("sosi", "hui");
    res.send([
        {message: message1},
        {message: message2}
    ]);
});


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});