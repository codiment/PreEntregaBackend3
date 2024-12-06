import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

//Creamos la configuracion de swagger:
const swaggerOptions = {

    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Adoptame documentacion',
            description: `## App dedicada para adoptar animales
    A traves de swagger podremos testear los metodos get, post, put y delete de los usuarios de la tienda de adopciones`
        }
    },
    apis: ['./src/docs/**/*.yaml']

}

//Conectamos Swagger a nuestro servidor Express:
const specs = swaggerJSDoc(swaggerOptions);

const configureSwagger = (app) => {
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
}

export default configureSwagger;