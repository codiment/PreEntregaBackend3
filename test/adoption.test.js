import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Router de Adopciones', () => {
    describe('GET /api/adoptions', () => {
        it('Me deberia retornar una lista de adopciones', async () => {
            const { status } = await requester.get('/api/adoptions');

            expect(status).to.equal(200);
        })

        it('Me retorna 404 si la ruta no existe', async () => {
            const { status } = await requester.get('/adoptions/noexiste');

            expect(status).to.equal(404);
        })

        it('Buscamos que me retorne la info de una adopcion existente', async () => {
            let aid = "677b55a205d682d52b4ea4dd";

            const { status } = await requester.get(`/api/adoptions/${aid}`);
            expect(status).to.equal(200);
        })

        it('Nos deberia retornar 404 si la adopcion no existe', async () => {
            let notAid = "677b4570b333aa1c0a95bc01";
            const { status } = await requester.get(`/api/adoptions/${notAid}`);

            expect(status).to.equal(404);
        })

        it('Vamos a crear una adopcion', async () => {
            let uid = "677b54ca05d682d52b4ea4c8";
            let pid = "677b54ca05d682d52b4ea4d4";

            const { status } = await requester.post(`/api/adoptions/${uid}/${pid}`);
            expect(status).to.equal(200);
        })

        it('Debería retornar 404 si el usuario no existe al intentar crear una adopción', async () => {
            let invalidUid = "000000000000000000000000"; // ID de usuario inexistente.
            let pid = "677b54ca05d682d52b4ea4d3";

            const { status, body } = await requester.post(`/api/adoptions/${invalidUid}/${pid}`);
            expect(status).to.equal(404);
        });

        it('Debería retornar una lista de adopciones con el formato correcto', async () => {
            const { status, body } = await requester.get('/api/adoptions');
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('array');
            if (body.payload.length > 0) {
                expect(body.payload[0]).to.have.property('owner');
                expect(body.payload[0]).to.have.property('pet');
                expect(body.payload[0]).to.have.property('_id');
            }
        })

        it('Debería fallar si el formato de la respuesta no es un array', async () => {
            // Simula un caso en el que `body.payload` no sea un array.
            const { status, body } = await requester.get('/api/adoptions');
            expect(status).to.equal(200);
            expect(body.payload).to.be.an('array'); // Si falla, sabrás que algo está mal con el formato de tu respuesta.
        });

        it('Debería retornar una adopción existente con el formato correcto', async () => {
            let aid = "677b55a205d682d52b4ea4dd";
            const { status, body } = await requester.get(`/api/adoptions/${aid}`);
            expect(status).to.equal(200);
            expect(body.payload).to.have.property('owner');
            expect(body.payload).to.have.property('pet');
            expect(body.payload).to.have.property('_id');
        });

        it('Debería retornar 404 si la adopción no existe', async () => {
            let nonExistentAid = "677b55a205d682d52b4ea4aa"; // ID que no existe en la base de datos.
            const { status, body } = await requester.get(`/api/adoptions/${nonExistentAid}`);
            expect(status).to.equal(404);
        });
    })
})