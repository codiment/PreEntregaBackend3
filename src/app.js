import express from 'express';
import cookieParser from 'cookie-parser';
import loggerRouter from "./utils/loggers.js";
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'
import configureSwagger from "./swagger/swagger.js";
import connectDB from "./database.js";

//Configuramos express y el puerto
const app = express();
const PORT = process.env.PORT||8080;

//Nos conectamos a la base de datos
connectDB();

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

//Configuramos swagger
configureSwagger(app);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
