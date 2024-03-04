/************************************/
/*** Import des modules nécessaires */
/************************************/
// noinspection JSCheckFunctionSignatures

const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')
const errorHandler = require('./error/errorHandler')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

/************************************/
/*** Import de la connexion à la DB */
/************************************/
let DB = require('./db.config')


/*****************************/
/*** Initialisation de l'API */
/*****************************/
const app = express()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags:
 *      - Auth Module
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'utilisateur.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mot de passe de l'utilisateur.
 *     responses:
 *       '200':
 *         description: Connexion réussie. Retourne le token d'accès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: "JWT token d'accès."
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs.
 *     tags:
 *      - User Module
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Succès. Retourne la liste des utilisateurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  lastName:
 *                                      type: string
 *                                  firstName:
 *                                      type: string
 *                                  pseudo:
 *                                      type: string
 *                                  email:
 *                                      type: string
 *                                  password:
 *                                      type: string
 */

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Créer un utilisateur.
 *     tags:
 *      - User Module
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lastName
 *               - firstName
 *               - pseudo
 *               - email
 *               - password
 *             properties:
 *               lastName:
 *                 type: string
 *                 example: Dupont
 *               firstName:
 *                 type: string
 *                 example: Martin
 *               pseudo:
 *                 type: string
 *                 example: Kéké
 *               email:
 *                 type: string
 *                 example: martin@dupont.com
 *                 format: email
 *                 description: Adresse email de l'utilisateur.
 *               password:
 *                 type: string
 *                 example: martin
 *                 format: password
 *                 description: Mot de passe de l'utilisateur.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Succès. Retourne la création de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             example: 1
 *                             type: integer
 *                           lastName:
 *                             example: Dupont
 *                             type: string
 *                           firstName:
 *                             example: Martin
 *                             type: string
 *                           pseudo:
 *                             example: kéké
 *                             type: string
 *                           email:
 *                             example: martin@dupont.com
 *                             type: string
 *                           password:
 *                             example: $2y$10$fCx3TihgTRhT.vqw/u9qDuHJr8w2KEe.YHgitZ7aV5vLoChqiTaYK
 *                             type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateurs.
 *     tags:
 *     - User Module
 *     description: Succès. Retourne l'utilisateurs.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identifiant requis
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Succès. Retourne l'utilisateurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  lastName:
 *                                      type: string
 *                                  firstName:
 *                                      type: string
 *                                  pseudo:
 *                                      type: string
 *                                  email:
 *                                      type: string
 *                                  password:
 *                                      type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: mettre à jour un utilisateur.
 *     tags:
 *      - User Module
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Identifiant requis
 *        schema:
 *          type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lastName
 *               - firstName
 *               - pseudo
 *               - email
 *               - password
 *             properties:
 *               lastName:
 *                 type: string
 *                 example: Dupont
 *               firstName:
 *                 type: string
 *                 example: Martin
 *               pseudo:
 *                 type: string
 *                 example: Kéké
 *               email:
 *                 type: string
 *                 example: martin@dupont.com
 *                 format: email
 *                 description: Adresse email de l'utilisateur.
 *               password:
 *                 type: string
 *                 example: martin
 *                 format: password
 *                 description: Mot de passe de l'utilisateur.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Succès. Mise à jour de l'utilisateur.
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateurs.
 *     tags:
 *      - User Module
 *     description: Succès. Retourne l'utilisateurs.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identifiant requis
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Succès. L'utilisateur est supprimé.
 */

/**
 * @swagger
 * /users/trash/{id}:
 *   delete:
 *     summary: Mettre à la poubelle un utilisateurs.
 *     tags:
 *      - User Module
 *     description: Succès. Retourne l'utilisateurs.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identifiant requis
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Succès. L'utilisateur est mis à la poubelle.
 */

/**
 * @swagger
 * /users/untrash/{id}:
 *   post:
 *     summary: Sortir de la poubelle un utilisateurs.
 *     tags:
 *      - User Module
 *     description: Succès. Retourne l'utilisateurs.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Identifiant requis
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Succès. L'utilisateur est sorti à la poubelle.
 */

/***********************************/
/*** Import des modules de routage */
/***********************************/
const user_router = require('./routes/users')
const technique_router = require('./routes/techniques')

const auth_router = require('./routes/auth')


/******************************/
/*** Mise en place du routage */
/******************************/
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerUiOptions))


app.get('/', (req, res) => res.send(`I'm online. All is OK !`))

app.use('/users', checkTokenMiddleware, user_router)
app.use('/techniques', technique_router)

app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send(`What the hell are you doing !?!`))

app.use(errorHandler)

/********************************/
/*** Start serveur avec test DB */
/********************************/
DB.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun !`)
        })
    })
    .catch(err => console.log('Database Error', err))


