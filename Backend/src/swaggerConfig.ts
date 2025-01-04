import swaggerJsdoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API Documentation',
        version: '1.0.0',
        description: 'This is the API documentation for my Node.js project.',
    },
    servers: [
        {
            url: 'http://localhost:3000', // Replace with your server URL
            description: 'Development server',
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Path to your API files (you may need to adjust based on your folder structure)
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec }