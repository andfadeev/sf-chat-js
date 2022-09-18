const {faker} = require("@faker-js/faker");

const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 8080;


// TODO: move something similar to test-server backend for local testing
// function generateFakeChatMessages(numberOfMessages) {
//
//     return [...Array(numberOfMessages).keys()].map((i) => {
//
//         const senderId = faker.helpers.arrayElement(userIds);
//         const receiverId = faker.helpers.arrayElement(userIds.filter(userId => userId !== senderId));
//
//         return {
//             id: i,
//             message: faker.lorem.text(),
//             sendDateTime: faker.date.past(),
//             senderId: senderId,
//             receiverId: receiverId,
//             messageDirection: faker.helpers.arrayElement(['Outgoing', 'Incoming'])
//         };
//     });
//
//
// }

// todo create a list of messages and return them in the response

app.get('/', (req, res) => {
    const message = faker.lorem.text();
    res.send(message);
});

// todo: add current-user endpoint

app.get('/api/direct-messages', (req, res) => {
    const message1 = faker.lorem.text();
    const message2 = faker.lorem.text();
    res.send([
        {message: message1},
        {message: message2}
    ]);
});


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});