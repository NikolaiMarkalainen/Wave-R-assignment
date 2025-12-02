import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import yaml from "yamljs";
import swaggerUi from "swagger-ui-express";
import employeeRouter from "./routes/employeeRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Example API using Swagger",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocument = yaml.load("./src/docs/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/employee", employeeRouter);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
