import express from 'express';
import controller from './controller';
import auth from '../../services/auth';

const routes = express.Router();

routes.post('/:id', auth, controller.addAttendanceById);

routes.get("/", auth, controller.showAttendance)

routes.get("/:id", auth, controller.showAttendanceById)

routes.get('/date/:id/', auth, controller.showAttendanceByIdAndDate)

routes.get('/:id/:month', auth, controller.showAttendanceByIdAndMonth)


export default routes;