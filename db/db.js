const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
        })
        console.log('MONGODB CONNECTED SUCCESSFUL !')

    } catch (err) {
        console.log(err)
    }
}
module.exports = connectDB;



// mongoose.connect(process.env.MONGODB_URL)
//     .then(() => {
//         console.log('Connected')

//     })
//     .catch((err) => { console.log(err) })


mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("mongodb is connected")
});