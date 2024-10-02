const express = require('express')
const AppController = require('../controllers/AppController');

const routes = (app) => {
	app.get('/status', Appcontroller.getStatus);
	app.get('/stats', Appcontroller.getStats);
}

module.exports = routes;
