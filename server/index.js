const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();
const { dbConfig } = require('./config');

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
  }

  try {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const [response] = await dbPool.execute(
      `INSERT INTO events.admins (admin_name, email, password)
            VALUES (?, ?, ?)`,
      [payload.admin_name, payload.email, encryptedPassword]
    );

    res.status(201).send({ message: 'Admin registered!' });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

server.listen(process.env.PORT, () =>
  console.log(`Server is running on port: ${process.env.PORT}`)
);
