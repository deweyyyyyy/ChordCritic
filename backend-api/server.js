//Remember URL -> http://localhost:3000

const express = require('express');
const app = express();
const PORT = 3020;
let data ={
    name: 'Test'
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>ChordCritic homepage</h1>');
    res.sendStatus(201);
});

app.get('/dashboard', (req, res) => {
    res.send('<h1>ChordCritic dashboard</h1>');
});

app.get('/api/data', (req, res) => {
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Testing if the server is running on http://localhost:${PORT}`);
});