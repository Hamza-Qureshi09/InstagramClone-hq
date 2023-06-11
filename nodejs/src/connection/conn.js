const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL).then((conn) => { console.log(`connection to DB is successfull ${conn.connection.host}`); }).catch((err) => { console.log(err, 'DB'); })