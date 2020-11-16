"use strict";

const { request } = require("http");
const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.APP_SECRET, { expiresIn: "1d" });
};

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, process.env.APP_SECRET);
  return data;
};

exports.authorize = function (request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    response.status(401).json({
      message: "Acesso Restrito",
    });
  } else {
    jwt.verify(token, process.env.APP_SECRET, function (error, decoded) {
      if (error) {
        response.status(401).json({
          message: "Token Inválido",
        });
      } else {
        next();
      }
    });
  }
};
