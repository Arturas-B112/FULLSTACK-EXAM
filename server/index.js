const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();
const { dbConfig } = require('./config');
const { authenticate } = require('./middleware');

const server = express();

server.use(express.json());
server.use(cors());

const adminRegisterSchema = Joi.object({
  admin_name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
});

const adminLoginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

const dbPool = mysql.createPool(dbConfig).promise();

server.post('/register', async (req, res) => {
  let payload = req.body;

  try {
    payload = await adminRegisterSchema.validateAsync(payload);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'All fields are required!' });
    return;
  }

  try {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const [response] = await dbPool.execute(
      `INSERT INTO events.admins (admin_name, email, password)
            VALUES (?, ?, ?)`,
      [payload.admin_name, payload.email, encryptedPassword]
    );

    res.status(201).send({ message: 'Admin registered! Now you can login :)' });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.post('/login', async (req, res) => {
  let payload = req.body;

  try {
    payload = await adminLoginSchema.validateAsync(payload);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'All field are required!' });
    return;
  }

  try {
    const [data] = await dbPool.execute(
      `SELECT * FROM events.admins WHERE email = ?`,
      [payload.email]
    );

    if (!data.length) {
      return res
        .status(400)
        .send({ error: 'Email or password did not match!' });
    }

    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      data[0].password
    );

    if (isPasswordMatching) {
      const token = jwt.sign(
        {
          admin_id: data[0].id,
          admin_name: data[0].admin_name,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).send({ token, data });
    }
    return res.status(400).send({ error: 'Email or password did not match!' });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.post('/visitors', authenticate, async (req, res) => {
  try {
    const payload = req.body;

    const response = await dbPool.execute(
      `INSERT INTO events.visitors (visitor_fullname, email, dob, admin_id)
            VALUES (?, ?, ?, ?)`,
      [payload.visitor_fullname, payload.email, payload.dob, req.admin.admin_id]
    );

    res
      .status(201)
      .send({ message: 'Visitor successfully registered to the event!' });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.get('/visitors', authenticate, async (_, res) => {
  try {
    const [response] = await dbPool.execute(`SELECT * FROM events.visitors`);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.listen(process.env.PORT, () =>
  console.log(`Server is running on port: ${process.env.PORT}`)
);
