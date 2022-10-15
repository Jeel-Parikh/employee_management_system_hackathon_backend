import express from 'express';
import controller from './controller';
import auth from '../../services/auth';

const routes = express.Router();

routes.post('/:id',auth, controller.addTaskById);

routes.get("/",auth, controller.showTasks)

routes.get("/:id",auth, controller.showTaskById)

routes.get('/:id/:date',auth,controller.showTaskByIdAndDate)

routes.put('/:id/:date',auth,controller.updateTaskStatus)

export default routes;