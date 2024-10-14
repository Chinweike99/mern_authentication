import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import connect from './database/connect.js';
import router from './Router/route.js';

const app = express();
const PORT = 3200;


/**Middle wares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable('x-powered-by'); // Less hackers know about your stack



app.get('/', (req, res) => {
    // res.send("Welcome to production");
    res.status(201).json("WELCOME TO PRODUCTION")
})


/** api routes */
app.use('/api', router)


/** Start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Listening on port http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Unable to connect to server")
    }
}).catch(error => {
    console.log("Invalid database connection ...!")
})
