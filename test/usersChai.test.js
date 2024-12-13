import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";
//Chai es una libreria de assertions, la cual nos permitira realizar comparaciones de test mas claras.
import chai from "chai";
const expect = chai.expect;

//Nos conectamos a la base de datos para testing.
mongoose.connect('mongodb+srv://codiment:coderhouse@cluster0.upyu7.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0')

//Describe: es una funcion que permite agrupar un conjunto de pruebas relacionadas bajo un mismo bloque descriptivo.

describe('Testeamos el DAO de Usuarios', function () {
    //Asignamos un titulo y pasamos una funcion callback que contiene todas las pruebas.
    before(function() {
        this.usersDao = new Users();
    })

    //Limpiamos la base de datos cada vez que testeamos
    beforeEach(async function() {
        await mongoose.connection.collections.users.drop();
    })

    //Hacemos una primera prueba
    it('El get de usuarios me debe retornar un array', async function () {
        const resultado = await this.usersDao.get()

        expect(Array.isArray(resultado)).to.be.true;
    })

    it('El dao debe agregar un usuario nuevo a la base de datos', async function () {
        let usuario = {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane@example.com',
            password: '123456'
        }

        const resultado = await this.usersDao.save(usuario);
        expect(resultado).to.have.property('_id');
    })

    it('Validamos que el usuario tenga un array de mascotas vacio', async function () {
        let usuario = {
            first_name: 'Lia',
            last_name: 'Crucet',
            email: 'lia@example.com',
            password: '123456'
        }

        const resultado = await this.usersDao.save(usuario);
        expect(resultado.pets).to.deep.equal([]);
    })

    it('El DAO puede obtener un usuario por email', async function () {
        let usuario = {
            first_name: 'Lia',
            last_name: 'Crucet',
            email: 'lia@example.com',
            password: '123456'
        }

        await this.usersDao.save(usuario);
        const user = await this.usersDao.getBy({ email: usuario.email });
        expect(user).to.be.an('object');

    })


    after(async function () {
        await mongoose.disconnect();
    })
})