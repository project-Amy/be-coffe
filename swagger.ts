import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coffee API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Coffee Backend service',
    },
    servers: [
      {
        url: 'http://localhost:8084',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.ts', './controllers/*.ts'], // Include TypeScript files
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { swaggerSpec };
export default setupSwagger;