import express from 'express';
import controller from './controller';

const routes = express.Router(); // eslint-disable-line new-cap

routes.post('/login',controller.loginUser);


export default routes;