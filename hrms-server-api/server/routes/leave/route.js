import express from 'express';
import controller from './controller';
import auth from '../../services/auth';

const routes = express.Router();

routes.post('/:id', auth, controller.addLeaveById);

routes.get("/", auth, controller.showLeaves)

routes.put("/:id", auth, controller.updateLeaveStatus)


export default routes;