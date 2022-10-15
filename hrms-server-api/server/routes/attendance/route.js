import express from 'express';
import controller from './controller';
import auth from '../../services/auth';

const routes = express.Router();

routes.post('/', auth, controller.addAttendanceById);

routes.get("/", auth, controller.showAttendance)

routes.get("/:id", auth, controller.showAttendanceById)

routes.get('/date/:id/', auth, controller.showAttendanceByIdAndDate)

routes.get('/:id/:year/:month', auth, controller.showAttendanceByIdAndMonthAndYear)


export default routes;