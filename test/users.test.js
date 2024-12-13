import mongoose from "mongoose";
//Modulo nativo de Node JS que nos permite hacer las validaciones:
import assert from "assert";
import Users from "../src/dao/Users.dao.js";

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

        assert.strictEqual(Array.isArray(resultado), true)
    })

    it('El dao debe agregar un usuario nuevo a la base de datos', async function () {
        let usuario = {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane@example.com',
            password: '123456'
        }

        const resultado = await this.usersDao.save(usuario);
        assert.ok(resultado._id);
        //Verificamos si el valor es verdadero
    })

    it('Validamos que el usuario tenga un array de mascotas vacio', async function () {
        let usuario = {
            first_name: 'Lia',
            last_name: 'Crucet',
            email: 'lia@example.com',
            password: '123456'
        }

        const resultado = await this.usersDao.save(usuario);
        assert.deepStrictEqual(resultado.pets, []);
    })

    it('El DAO puede obtener un usuario por email', async function () {
        let usuario = {
            first_name: 'Lia',
            last_name: 'Crucet',
            email: 'lia@example.com',
            password: '123456'
        }

        await this.usersDao.save(usuario);
        const user = await this.usersDao.get({ email: usuario.email });

        assert.strictEqual(typeof user, 'object');
    })


    after(async function () {
        await mongoose.disconnect();
    })
})