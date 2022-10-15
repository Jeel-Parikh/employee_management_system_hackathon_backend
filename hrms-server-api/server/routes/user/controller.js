import User from "../../models/User"
import md5 from "md5";
import { filePath } from "../../services/constant";
import getToken from "../../services/auth";



const addUserDetail = ((req, res) => {
        let reqObj = req.body
        
        reqObj['aadharCard'] = req.files ? filePath + req.files.aadharCard[0].filename : reqObj.aadharCard
        // console.log("reqObj",reqObj)
        // return
        reqObj['panCard'] = req.files ? filePath + req.files.panCard[0].filename : reqObj.panCard
        reqObj['userPhoto'] = req.files ? filePath + req.files.userPhoto[0].filename : reqObj.userPhoto
        User.findByIdAndUpdate(req.params.id, reqObj, { runValidators: true, new: true })
            .then((result) => {
                res.json({ response: true, result: result });
            })
            .catch(err => console.log("error in addUserDetail", err));
    
})


const addUser = ((req, res) => {

        req.body.password = md5(req.body.password)
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    res.json({ msg: 'User already exists' });
                } else {
                    User.create(req.body)
                        .then((result) => {
                            res.json({ response: true, result: result });
                        })
                        .catch(err => console.log("error in addUserDetail", err));
                }
            })
})


const showUser = (async (req, res) => {

        User.find().lean(true)
            .then((result) => {
                res.json({ response: true, result: result });
            })
            .catch(err => console.log("error in addUserDetail", err));
})


const showUserById = ((req, res) => {
        User.findById(req.params.id)
            .then((result) => {
                res.json({ response: true, result: result });
            })
            .catch(err => console.log("error in addUserDetail", err));

})



const delUser = ((req, res) => {
        User.findByIdAndDelete(req.params.id, req.body)
            .then((result) => {
                res.json({ response: true, result: result });
            })
            .catch(err => console.log("error in addUserDetail", err));
})

const controller = {
    addUserDetail: addUserDetail,
    addUser: addUser,
    showUser: showUser,
    delUser: delUser,
    showUserById: showUserById
};

export default controller;