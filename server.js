/************************************/
/*** Import des modules nécessaires */
/************************************/
// noinspection JSCheckFunctionSignatures

const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')
const errorHandler = require('./error/errorHandler')
const { swaggerDocs, swaggerUiOptions } = require('./swagger');
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


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log In the user.
 *     tags:
 *       - Auth Module
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
 *                 description: User email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password.
 *     responses:
 *       '200':
 *         description: Connected.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   description: "JWT access token"
 *       '400':
 *         description: Bad email or password.
 *       '401':
 *         description: Not Authorized.
 *       '500':
 *         description: Internal Error.
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users from BDD.
 *     tags:
 *      - User Module
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Return an array of all users.
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
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Create new user in BDD.
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
 *                 description: User email address.
 *               password:
 *                 type: string
 *                 example: martin
 *                 format: password
 *                 description: User password.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Return object with the new user informations.
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
 *       '400':
 *         description: Missing Data.
 *       '409':
 *         description: User already exists.
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get one user by ID.
 *     tags:
 *     - User Module
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: User ID.
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User.
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
 *       '400':
 *         description: Missing parameter.
 *       '404':
 *         description: User not exist.
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Modify User.
 *     tags:
 *      - User Module
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User ID.
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
 *         description: User updated.
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete one user.
 *     tags:
 *      - User Module
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: User ID to delete.
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: User deleted.
 *       '400':
 *         description: Missing parameter.
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /users/trash/{id}:
 *   delete:
 *     summary: Trash one user.
 *     tags:
 *      - User Module
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: User ID trash.
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: User trashed.
 *       '400':
 *         description: Missing parameter.
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /users/untrash/{id}:
 *   post:
 *     summary: Untrash one user.
 *     tags:
 *      - User Module
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: User ID to untrash.
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: User untrashed.
 *       '400':
 *         description: Missing parameter
 *       '500':
 *         description: Internal Error
 */

/**
 * @swagger
 * /techniques:
 *   get:
 *     summary: Get all techniques from BDD.
 *     tags:
 *      - Technique Module
 *     responses:
 *       '200':
 *         description: Return an array of all techniques.
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
 *                          technique:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  user_id:
 *                                      type: integer
 *                                  name:
 *                                      type: string
 *                                  group:
 *                                      type: string
 *                                  subgroup:
 *                                      type: string
 *                                  family:
 *                                      type: string
 *                                  kyuGoKyoNoWaza:
 *                                      type: string
 *                                  goKyoNoWaza:
 *                                      type: string
 *                                  description:
 *                                      type: text
 *                                  youtubeId:
 *                                      type: string
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /techniques:
 *   put:
 *     summary: Create new technique in BDD.
 *     tags:
 *      - Technique Module
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - name
 *               - group
 *               - subGroup
 *               - family
 *               - kyuGoKyoNoWaza
 *               - goKyoNoWaza
 *               - description
 *               - youtubeId
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Seoi
 *               group:
 *                 type: string
 *                 example: Nage-Waza
 *               subGroup:
 *                 type: string
 *                 example: Tachi-Waza
 *               family:
 *                  type: string
 *                  example: Te-Waza
 *               kyuGoKyoNoWaza:
 *                 type: string
 *                 example: ikkyo
 *               goKyoNoWaza:
 *                  type: string
 *                  example: ikkyo
 *               description:
 *                  type: text
 *                  example: lorem ipsum
 *               youtubeId:
 *                  type: string
 *                  example: gygughiguyg
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Return object with the new technique informations.
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
 *                       technique:
 *                         type: object
 *                         properties:
 *                           id:
 *                             example: 1
 *                             type: integer
 *                           user_id:
 *                             example: 1
 *                             type: integer
 *                           name:
 *                             example: Seoi
 *                             type: string
 *                           group:
 *                             example: Nage-Waza
 *                             type: string
 *                           subGroup:
 *                             example: Tachi-Waza
 *                             type: string
 *                           family:
 *                             example: Te-Waza
 *                             type: string
 *                           kyuGoKyoNoWaza:
 *                              example: ikkyo
 *                              type: string
 *                           goKyoNoWaza:
 *                              example: ikkyo
 *                              type: string
 *                           description:
 *                              example: lorem ipsum
 *                              type: text
 *                           youtubeId:
 *                              example: gygughiguyg
 *                              type: string
 *       '400':
 *         description: Missing Data.
 *       '409':
 *         description: User already exists.
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /techniques/{id}:
 *   get:
 *     summary: Get one technique by ID.
 *     tags:
 *      - Technique Module
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Technique ID.
 *            schema:
 *              type: integer
 *     responses:
 *       '200':
 *         description: Technique.
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
 *                          technique:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  user_id:
 *                                      type: integer
 *                                  name:
 *                                      type: string
 *                                  group:
 *                                      type: string
 *                                  subgroup:
 *                                      type: string
 *                                  family:
 *                                      type: string
 *                                  kyuGoKyoNoWaza:
 *                                      type: string
 *                                  goKyoNoWaza:
 *                                      type: string
 *                                  description:
 *                                      type: text
 *                                  youtubeId:
 *                                      type: string
 *       '400':
 *         description: Missing parameter.
 *       '404':
 *         description: Technique not exist.
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /techniques/{id}:
 *   patch:
 *     summary: Modify Technique.
 *     tags:
 *      - Technique Module
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Technique ID.
 *        schema:
 *          type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - name
 *               - group
 *               - subGroup
 *               - family
 *               - kyuGoKyoNoWaza
 *               - goKyoNoWaza
 *               - description
 *               - youtubeId
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Seoi
 *               group:
 *                 type: string
 *                 example: Nage-Waza
 *               subGroup:
 *                 type: string
 *                 example: Tachi-Waza
 *               family:
 *                 type: string
 *                 example: Te-Waza
 *               kyuGoKyoNoWaza:
 *                  type: string
 *                  example: ikkyo
 *               goKyoNoWaza:
 *                  type: string
 *                  example: ikkyo
 *               description:
 *                  type: text
 *                  example: lorem ipsum
 *               youtubeId:
 *                  type: string
 *                  example: gghhggiii
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated.
 */

/**
 * @swagger
 * /techniques/{id}:
 *   delete:
 *     summary: Delete one technique.
 *     tags:
 *      - Technique Module
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Technique ID to delete.
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Technique deleted.
 *       '400':
 *         description: Missing parameter.
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /techniques/trash/{id}:
 *   delete:
 *     summary: Trash one technique.
 *     tags:
 *      - Technique Module
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Technique ID trash.
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Technique trashed.
 *       '400':
 *         description: Missing parameter.
 *       '500':
 *         description: Internal Error.
 */

/**
 * @swagger
 * /techniques/untrash/{id}:
 *   post:
 *     summary: Untrash one technique.
 *     tags:
 *      - Technique Module
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Technique ID to untrash.
 *            schema:
 *              type: integer
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Technique untrashed.
 *       '400':
 *         description: Missing parameter
 *       '500':
 *         description: Internal Error
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


