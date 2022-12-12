const mongoose = require('mongoose');

const dbName = "Bookworms"
const url = `mongodb+srv://Rinakumari:reena123@cluster0.y9x1y1c.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// connect to the database
// asynchronous function - returns a promise(Object)
mongoose.connect(url)
.then((result) => {
    console.log('successfully connected');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;