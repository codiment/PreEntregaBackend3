import winston from "winston";
import { Router } from "express";
const router = Router();

// Personalizamos los niveles y colores
const niveles = {
    nivel: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colores: {
        fatal: 'red',
        error: 'yellow',
        warning: 'blue',
        info: 'green',
        http: 'magenta',
        debug: 'cyan'
    }
}

// Configuración del logger
const logger = winston.createLogger({
    levels: niveles.nivel,
    transports: [
        new winston.transports.Console({
            level: 'debug', // Corregimos el nivel a 'http' que sí está en los niveles personalizados
            format: winston.format.combine(
                winston.format.colorize({ colors: niveles.colores }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
    ]
});

// Middleware para agregar el logger a req
const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);
    next();
};

// Aplica el middleware en todas las rutas de este router
router.use(addLogger);

// Ruta de prueba
router.get('/', (req, res) => {
    req.logger.http('Mensaje HTTP');
    req.logger.info('Mensaje de info');
    req.logger.warning('Cuidado, puede haber un error');
    req.logger.error('Error encontrado');
    req.logger.fatal('Error fatal');
    req.logger.debug('Mensaje de depuracion');
    res.send('Inicio');
});

export default router;