// importing express
const express = require('express');
const userRouter = require('./routers/userRouter');
const novelRouter = require('./routers/novelRouter');
const utilRouter = require('./routers/util');
const cors = require('cors');

const stripe_sk =
  "sk_test_51L1Wf4SG8drK0Wt5r9B58VpCVuppBvRGQciPAEEoKGtMEtRWr9HpGdBK8ulyJuckoVaJcaUSPDeYibVSIi89rGgj006q8dj8ZW";
const stripe = require("stripe")(stripe_sk);

// initializing express
const app = express();
const port = 5000;

// middleware

app.use(cors({ origin : 'http://localhost:3000' }));
app.use(express.json());
app.use('/user', userRouter);
app.use('/novel', novelRouter);
app.use('/util', utilRouter);

app.use(express.static('./static/uploads'));

// creating a route or endpoint
app.get('/', (req, res) => {
    res.send('Response from express');
});

app.post("/create-payment-intent", async (req, res) => {
    const data = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: "inr",
    });
    res.status(200).json(paymentIntent);
  });


app.listen(port, () => { console.log('express server started on 5000...') });