import User from "../../models/User"
import Task from "../../models/Task"
import Project from "../../models/Project"
import multer from 'multer';
import path from 'path';
import express from "express";
import { secretKey } from "../../services/constant";
import jwt from "jsonwebtoken"
import md5 from "md5";

const loginUser = (async (req, res) => {
  let reqObj = req.body
  const resObj = {}
  console.log("req.body", reqObj)

  User.findOne({ email: reqObj.email }).then((user) => {
    if (user) {
      reqObj.password = md5(reqObj.password)
      if (user.password === reqObj.password) {
        console.log("here")
        var payload = {
          user: user
        }
        let token = jwt.sign(payload, secretKey,
          { expiresIn: "2h" })
        console.log("token", token)
       
        resObj.message = "User login successfully"
        resObj.type = "success"
        resObj.data = user
        resObj.token = token
        // console.log("resobj: ", resObj)
        // return
        res.json({ response: true, result: resObj })
      } else {
        resObj.message = "Invalid username or password"
        resObj.type = "error"
        res.json({ response: true, result: resObj })
      }
    } else {
      resObj.message = "User not found"
      resObj.type = "error"
      res.json({ response: true, result: resObj })
    }
  })
})

const controller = {
  loginUser: loginUser
};

export default controller;