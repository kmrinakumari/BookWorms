// importing express
const express = require('express');
const userRouter = require('./routers/userRouter');
const novelRouter = require('./routers/novelRouter');
const cors = require('cors');

// initializing express
const app = express();
const port = 5000;

// middleware

app.use(cors({ origin : 'http://localhost:3000' }));
app.use(express.json());
app.use('/user', userRouter);
app.use('/novel', novelRouter);

// creating a route or endpoint
app.get('/', (req, res) => {
    res.send('Response from express');
});

app.get('/add', (req, res) => {
    res.send('Response from add');
})

app.get('/home', (req, res) => {
    res.send('Response from Home');
})


app.listen(port, () => { console.log('express server started on 5000...') });