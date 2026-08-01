import swaggerJsdoc from "swagger-jsdoc";
import { env } from "../config/env";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "GlowHome API",
      version: "1.0.0",
      description:
        "REST API documentation for GlowHome - On Demand Home Services Platform",
      contact: {
        name: "GlowHome Engineering Team",
        email: "glowhome.help@gmail.com",
      },
    },

    servers: [
      {
        url: process.env.BACKEND_URL || "https://nexserve-back.onrender.com",
        description: "Production Server",
      },
      {
        url: `http://localhost:${env.PORT || 5000}`,
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