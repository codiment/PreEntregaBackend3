import supertest from 'supertest';
import {expect} from "chai";
import express from "express";

//Creamos una constante llamda 'requester' que se encarga de hacer las peticiones al servidor.
const requester = supertest('http://localhost:8080');

//Ahora trabajos con dos 'describe'. Uno para la aplicacion 'adoptame' y la otra para la entidad interna.
describe('Testing de adoptame', () => {
    describe('Testing mascotas', () => {
        it('Endpoint POST /api/pets debe crear una mascota exitosamente', async () => {
            //Creamos un mock
            const dogMock = {
                name: 'Toby',
                specie: 'Dog',
                birthDate: '1990-01-01',
            }
            const {statusCode, ok, _body} = await requester.post('/api/pets').send(dogMock);

            //Renderizamos en la terminal
            console.log('StatusCode:', statusCode);
            console.log('OK:', ok);
            console.log('Body:', _body);

            //Testing
            expect(_body.payload).to.have.property('_id');
        })

        //Create
        it('Al crear una mascota solo con los datos esenciales, la mascota tiene que tener la propiedad adopted con el valor false', async () => {
            const newDog = {
                name: 'Max',
                specie: 'Pastor',
                birthDate: '1991-01-01',
            }
            const {statusCode, _body} = await requester.post('/api/pets').send(newDog);

            //Mensaje de validaciones
            expect(statusCode).to.equal(200);
            expect(_body.payload).to.have.property('adopted').that.equal(false);
        })

        //Mas test
        it('Si se desea crear una mascota sin el campo nombre, el modulo debe responder con un status 400 ', async () => {
            const notName = {
                specie: 'Cat',
                birthDate: '1992-01-01',
            }
            const {statusCode} = await requester.post('/api/pets').send(notName);

            //Testing
            expect(statusCode).to.equal(400);
        })

        //Metodo crud con testing
        //GET
        it('Al obtener a las mascotas con el metodo GET, la respuesta debe tener los campos status y payload. Ademas debe ser de tipo arreglo', async () => {
            const { statusCode, _body } = await requester.get('/api/pets');
            expect(statusCode).to.equal(200);
            expect(_body).to.have.property('status').that.equal('success');
            expect(_body).to.have.property('payload').that.is.an('array');
        })

        //PUT
        it('El metodo PUT debe poder actualizar correctamente a una mascota determinada (esto se puede testear comparando el valor previo con el nuevo valor de la base de datos).', async () => {
            const idMascotaExistente = '6759d66d0347d924d5d5cc36';

            const datosActualizados = {
                name: 'Necros',
                specie: 'Reptilian',
                //Podemos agregar mas datos si queremos
            }

            const { statusCode } = await requester.put(`/api/pets/${idMascotaExistente}`).send(datosActualizados);

            expect(statusCode).to.equal(200);
            //Verificar si se modifica la base de datos en la coleccion pets
        })

        //DELETE
        it('El metodo delete debe poder borrar la ultima mascota agregada, esto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota con el DELETE y luego corroborar si la mascota existe con un GET', async () => {
            //Primero agregamos la ultima mascota creada
            const nuevaMascota = {
                name: 'Mascota a eliminar',
                specie: 'Perro',
                birthDate: '1993-01-01',
            }

            //Lo enviamos con un POST
            const { body: {payload: {_id}} } = await requester.post('/api/pets').send(nuevaMascota);

            //Eliminamos la mascota agregada
            const { statusCode } = await requester.delete(`/api/pets/${_id}`);

            expect(statusCode).to.equal(200);
        })

        //Registro de usuarios
        describe('Test Avanzado', () => {
            //Declaramos de forma global la variable 'cookie.
            let cookie;

            it('Debe registrar correctamente a un usuario', async () => {
                const mockUsuario = {
                    first_name: 'Johnnnn',
                    last_name: 'Douu',
                    email: 'john@dou.com',
                    password: '123456',
                }

                const {_body} = await  requester.post('/api/sessions/register').send(mockUsuario);

                expect(_body.payload).to.be.ok;
            })

            it('Debe loguear correctamente al usuario y recuperar la cookie', async () => {
                const mockUsuario = {
                    email: 'john@dou.com',
                    password: '123456',
                }

                const resultado = await requester.post('/api/sessions/login').send(mockUsuario);

                //Se obtiene la cookie y se guarda en una variable
                const cookieResultado = resultado.headers['set-cookie']['0'];

                expect(cookieResultado).to.be.ok;

                //Se separa el nombre y el valor de la cookie recuperada y se guarda en un objeto
                //El metodo split separa un string en cadenas
                cookie = {
                    name: cookieResultado.split('=')['0'],
                    value: cookieResultado.split('=')['1'],
                }

                expect(cookie.name).to.be.ok.and.eql('coderCookie')
                expect(cookie.value).to.be.ok;
            })
            it('Debe enviar la cookie que contiene el usuario', async () => {
                //Enviamos la cookie que guardamos:
                const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);

                expect(_body.payload.email).to.be.ok.eql('john@dou.com');
            })
        })
    })

    //Testing con carga de imagenes:
    describe('Testeamos la carga de imagenes', () => {
        it('Tenemos que crear una mascota con una imagen', async () => {
            const mascotaMock = {
                name: 'Gatito',
                specie: 'Gato',
                birthDate: '1994-01-01',
            }

            //Ahora ya no usamos el metodo send, sino que usamos field, para los distintos campos:
            const resultado = await requester.post('/api/pets/withimage')
                .field('name', mascotaMock.name)
                .field('specie', mascotaMock.specie)
                .field('birthDate', mascotaMock.birthDate)
                .attach('image', './test/gatito.png')

                expect(resultado.status).to.be.equal(200);

                expect(resultado._body.payload).to.have.property('_id');

                expect(resultado._body.payload.image).to.be.ok;
        })
    })
})