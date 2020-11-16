"use strict";

const { request, response } = require("express");
const mongoose = require("mongoose");
const repository = require("../repositories/product-repositorie");

exports.get = async (request, response, next) => {
  try {
    const data = await repository.get();
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.getBySlug = async (request, response, next) => {
  try {
    const data = await repository.getBySlug(request.params.slug);
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.getById = async (request, response, next) => {
  try {
    const data = await repository.getById(request.params.id);
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.getByTag = async (request, response, next) => {
  try {
    const data = await repository.getByTag(request.params.tag);
    response.status(200).send(data);
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.post = async (request, response, next) => {
  try {
    await repository.create(request.body);
    response.status(200).send({
      message: "Produto cadastrado com sucesso!",
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.put = async (request, response, next) => {
  try {
    const data = await repository.update(request.params.id, request.body);
    response.status(200).send({
      message: "Produto atualizado com sucesso!",
      product: data,
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};

exports.delete = async (request, response, next) => {
  try {
    await repository.delete(request.params.id);
    response.status(200).send({
      message: "Produto deletado!",
    });
  } catch (e) {
    response.status(500).send({
      message: "Falha ao processar requisição!",
    });
  }
};
