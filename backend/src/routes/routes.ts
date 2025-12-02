import type { Express } from "express";
import swaggerUi from "swagger-ui-express";
import employeeRouter from "./employeeRoute.js";
import yaml from "yamljs";

export const registerRoutes = (app: Express) => {
  const swaggerDocument = yaml.load("./src/docs/swagger.yaml");

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/employee", employeeRouter);
};
