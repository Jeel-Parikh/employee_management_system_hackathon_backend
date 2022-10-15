import User from "../models/User"
// import Task from "../models/Task"
// import Project from "../models/Project"
import express from "express";
import userRoute from './user';
import authRoute from './auth';
import taskRoute from './task';
import attendanceRoute from './attendance'

var router = express.Router();


router.use('/user', userRoute);

router.use('/auth', authRoute);

router.use('/task',taskRoute);

router.use('/attendance',attendanceRoute);


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const person = await User.findOne({ email: email })
    if (person.password == password) {
      res.json({ status: true, person: person })
    }
    else {
      res.json({ status: false })
    }
  }
  catch (e) {
    res.json({ status: false })
  }
})

// router.post("/project", async (req, res) => {
//   const { project } = req.body;
//   let p = new Project({});

// })


export default router;