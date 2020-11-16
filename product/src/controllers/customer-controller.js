"use strict";

const repository = require("../repositories/customer-repositorie");
const md5 = require("md5");
const authService = require("../services/auth-service");
require("dotenv").config();

exports.post = async (request, response, next) => {
  try {
    const customer = await repository.create({
      name: request.body.name,
      email: request.body.email,
      password: md5(request.body.password + process.env.APP_SECRET),
    });
    response.status(201).send({
      message: "Cliente cadastrado com sucesso!",
      id: customer._id,
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.authenticate = async (request, response, next) => {
  try {
    const customer = await repository.authenticate({
      email: request.body.email,
      password: md5(request.body.password + process.env.APP_SECRET),
    });

    if (!customer) {
      response.status(404).send({
        message: "Usuário ou senha inválidos",
      });
      return;
    }

    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
    });

    response.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.refreshToken = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    const [, token] = authHeader.split(" ");
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      response.status(404).send({
        message: "Cliente não encontrado",
      });
      return;
    }

    const tokenGenerated = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
    });

    response.status(201).send({
      token: tokenGenerated,
      data: {
        email: customer.email,
        name: customer.name,
      },
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};
