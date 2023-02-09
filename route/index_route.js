const express = require('express');
const route = require("express").Router();
const path = require('path');
route.use(require("express").urlencoded({
    extended: true
}));
route.use(require("express").json());

// route.use("/files", express.static(path.join('Files')));

const student = require("./student_route");
route.use("/student", student);

const field = require("./field_route");
route.use("/field", field);

module.exports = route;