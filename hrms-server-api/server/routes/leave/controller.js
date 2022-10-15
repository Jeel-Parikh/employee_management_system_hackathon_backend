import Leave from "../../models/Leave"
import getCurrentDate from "../../services/date"

const addLeaveById = ((req, res) => {
    // const { startDate, endDate,reason,title,admin_response,type } = req.body
    let reqObj=req.body
    reqObj.userId=req.params.id
    Leave.create({ userId: req.params.id, appliedDate: getCurrentDate() })

        .then((resul) => {

            Leave.findOne({ "_id": resul._id }).populate("userId")
                .then((result) => {
                    res.json({ response: true, result: result })
                })

                .catch(err => console.log('error', err))
        })

        .catch(err => console.log("error in addLeave", err));

})


const showLeaves = ((req, res) => {
    Leave.find().populate("userId").lean(true)
        .then((result) => {
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in addUserDetail", err));
})

const updateLeaveStatus = ((req, res) => {

    // Leave.findOneAndUpdate({ userId: req.params.id, date: new Date(req.params.date), "Leave._id": req.body._id }, { "Leave.$.status": req.body.status }, { runValidators: true, new: true }).populate("userId")
    Leave.findOneAndUpdate({ "Leave._id": req.params.id }, { "Leave.$.status": req.body.status }, { runValidators: true, new: true }).populate("userId")
        .then((result) => {
            // console.log("------->result", result)
            // return
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in addUserDetail", err));
})


const controller = {
    addLeaveById: addLeaveById,
    showLeaves: showLeaves,
    updateLeaveStatus: updateLeaveStatus
};

export default controller;