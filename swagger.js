/************************************/
/*** Import des modules nécessaires */
/************************************/

const swaggerJsDoc = require('swagger-jsdoc')


/****************************************************/
/*** Mise en place de la documentation avec swagger */
/****************************************************/

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "API sur les techniques de Judo",
            version: "1.0.0"
        },
        // servers: [
        //     {
        //         url: `http://${process.env.DB_HOST}:${process.env.SERVER_PORT}/`
        //     }
        // ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: {
            bearerAuth: [],
        },
    },
    apis: ["./routes/*.js", "server.js"]
}

const swaggerUiOptions = {
    explorer: true
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)
// console.log(swaggerDocs)

module.exports = {swaggerDocs, swaggerUiOptions}