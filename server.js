/************************************/
/*** Import des modules nécessaires */
/************************************/
// noinspection JSCheckFunctionSignatures

const express = require("express");
const path = require("path");
const cors = require("cors");
const checkTokenMiddleware = require("./jsonwebtoken/check");
const errorHandler = require("./error/errorHandler");
// const { swaggerDocs, swaggerUiOptions } = require('./swagger');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./swagger.yaml");

/************************************/
/*** Import de la connexion à la DB */
/************************************/
let DB = require("./db.config");

/*****************************/
/*** Initialisation de l'API */
/*****************************/
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders:
      "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*****************************************************/
/*** Définition du dossier des fichiers statiques */
/*****************************************************/
app.use(express.static(path.join(__dirname, "public")));

/***********************************/
/*** Import des modules de routage */
/***********************************/
const user_router = require("./routes/users");
const technique_router = require("./routes/techniques");

const auth_router = require("./routes/auth");

/******************************/
/*** Mise en place du routage */
/******************************/
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerUiOptions))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/users", checkTokenMiddleware, user_router);
app.use("/techniques", technique_router);

app.use("/auth", auth_router);

app.get("*", (_req, res) =>
  res.status(501).send(`What the hell are you doing !?!`),
);

app.use(errorHandler);

/********************************/
/*** Start serveur avec test DB */
/********************************/
DB.authenticate()
  .then(() => console.log("Database connection OK"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `This server is running on port ${process.env.SERVER_PORT}. Have fun !`,
      );
    });
  })
  .catch((err) => console.log("Database Error", err));
