import express from 'express';
import controller from './controller';
import { upload } from '../../services/multerService'
import { documentsPath } from "../../services/constant";
import auth from '../../services/auth';
const routes = express.Router(); // eslint-disable-line new-cap


let cpUpload = upload(documentsPath).fields([{ name: "aadharCard", maxCount: 1 }, { name: "panCard", maxCount: 1 }, { name: "userPhoto", maxCount: 1 }]);

routes.get("/", auth, controller.showUser)

routes.post('/', auth, controller.addUser);

routes.delete("/:id", auth, controller.delUser)

routes.put('/:id', auth, cpUpload, controller.addUserDetail);

routes.get("/:id", auth, controller.showUserById)

export default routes;