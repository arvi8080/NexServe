import swaggerJsdoc from "swagger-jsdoc";
import { env } from "../config/env";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "NexServe API",
      version: "1.0.0",
      description:
        "REST API documentation for NexServe - On Demand Home Services Platform",
      contact: {
        name: "Arvind Prajapati",
        email: "your-email@example.com",
      },
    },

    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Development Server",
      },
    ],

    tags: [{ name: "Health", description: "Health check endpoints" }],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);