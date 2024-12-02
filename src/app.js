import express from 'express';
import cookieParser from 'cookie-parser';
import loggerRouter from "./utils/loggers.js";
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'

const app = express();
const PORT = process.env.PORT||8080;
import "./database.js"

//Configuramos express
app.use(express.json());
app.use(cookieParser());
//Configuramos logger
app.use('/', loggerRouter);

//Rutas para Usuario y Mascotas
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);



app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
