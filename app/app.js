"use-strict";
const Hapi = require("@hapi/hapi");
const config = require("./config/index");
const Inert = require("@hapi/inert");
const Vison = require("@hapi/vision");
const routers = require("../app/main/router");

let server;
const apiVersionOptions = {
  basePath: "/api",
  validVersions: [1, 2],
  defaultVersion: 1,
  vendorName: "api demo",
};
const swaggerOptions = {
  pathPrefixSize: 3,
  basePath: apiVersionOptions.basePath,
  info: {
    title: " API database demo Documentation",
    description: "This is API database demo documentation.",
    contact: {
      email: "maidangloidn2000@gmail.com",
    },
  },
  documentationPath: "/api/v1/doc",
  deReference: false,
  schemes: ["http", "https"],
  security: [{ Bearer: [] }],
};

process.on("uncaughtException", () => {
  process.exit(1);
});

exports.server = async (opts) => {
  server = new Hapi.Server({
    port: config.app.port,
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Authorization', 'Content-Type', 'Dealership-Domain', 'dealer-id'], 
        maxAge: 60,
        credentials: true,
      },
  }});

  const plugins = [
    Inert,
    Vison,
    {
      plugin: require("hapi-swagger"),
      options: swaggerOptions,
    },
    {
      plugin: require('./plugins/logger'),
      options: {
        name: 'dash-api',
        prettyPrint: process.env.NODE_ENV !== 'production',
        redact: ['req.headers.authorization'],
        once: true,
      },
    },
  ];
  await server.register(plugins);
  await server.route(routers);
  
  if (opts.start) {
    await server.start();
    // console.log(`Start server at ${config.app.port}`)
  } else {
    await server.initialize();
  }
  return server;
};
