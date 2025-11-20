// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DICRI - Gestión de Evidencias',
            version: '1.0.0',
            description: 'API para gestión de usuarios, roles, estados y expedientes',
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Servidor local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        './src/routes/*.js',
    ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
