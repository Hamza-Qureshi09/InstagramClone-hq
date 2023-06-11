require('dotenv').config();
require('./src/connection/conn')
const express = require('express')
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path")
const errorHandlerMiddleware = require('./middlewares/customErrorHandler')
const instagramPostsRoutes = require('./routes/v1/posts')
const instagramUsersRoutes = require('./routes/v1/user')
const app = express()
const Port = process.env.Port || 5003


// handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`server is shutting down due to handling uncaught exception`);
    process.exit(1)
})


app.use(morgan("common"))
app.use(helmet())
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:5173', 'https://fyp-fontend.vercel.app'],
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
// }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
})


app.use("/api", instagramUsersRoutes)
app.use("/api", instagramPostsRoutes)
app.all("*", (req, res) => {
    res.status(404)
    if (req.accepts('json')) {
        return res.json({ message: "Not Found!" })
    } else {
        return res.type('txt').send('Not Found!')
    }
})

// error handler
app.use(errorHandlerMiddleware)

const server = app.listen(Port, () => console.log(`sever is running on port ${Port} and for this task Worker:- ${process.pid} is assigned`));


//  unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log(`server is shutting down due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1)
    })
})

module.exports = app