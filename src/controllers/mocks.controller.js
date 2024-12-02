import MockingService from "../services/mocking.js";
import User from "../dao/models/User.js";
import Pet from "../dao/models/Pet.js";

const getMockingUsers = async (req, res) => {
    try {
        req.logger.info('Generando usuarios de prueba...');
        const users = await MockingService.generateMockingUsers(50);
        req.logger.debug(`Usuarios generados: ${JSON.stringify(users, null, 2)}`);
        res.send({ status: 'success', payload: users });
    } catch (error) {
        req.logger.error(`Error al generar usuarios: ${error.message}`);
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const getMockingPets = async (req, res) => {
    try {
        req.logger.info('Generando mascotas de prueba...');
        const pets = await MockingService.generateMockingPets(100);
        req.logger.debug(`Mascotas generadas: ${JSON.stringify(pets, null, 2)}`);
        res.send({ status: 'success', payload: pets });
    } catch (error) {
        req.logger.error(`Error al generar mascotas: ${error.message}`);
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const generateData = async (req, res) => {
    try {
        req.logger.info('Iniciando carga de datos...');
        const { users, pets } = req.body;

        if (users) {
            req.logger.info(`Generando y guardando ${users} usuarios...`);
            const userMocks = await MockingService.generateMockingUsers(users);
            await User.insertMany(userMocks);
            req.logger.debug(`Usuarios insertados: ${JSON.stringify(userMocks, null, 2)}`);
        }

        if (pets) {
            req.logger.info(`Generando y guardando ${pets} mascotas...`);
            const petMocks = await MockingService.generateMockingPets(pets);
            await Pet.insertMany(petMocks);
            req.logger.debug(`Mascotas insertadas: ${JSON.stringify(petMocks, null, 2)}`);
        }

        res.send({ status: 'success', message: 'Datos cargados con éxito!' });
        req.logger.info('Datos cargados con éxito!');
    } catch (error) {
        req.logger.error(`Error al cargar datos: ${error.message}`);
        res.status(500).send({ status: 'error', error: error.message });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData,
};