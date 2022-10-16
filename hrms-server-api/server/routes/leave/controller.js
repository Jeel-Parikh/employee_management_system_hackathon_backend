import Leave from "../../models/Leave"
import getCurrentDate from "../../services/date"

const addLeaveById = ((req, res) => {
    // const { startDate, endDate,reason,title,admin_response,type } = req.body
    let reqObj = req.body
    reqObj.userId = req.params.id
    reqObj.appliedDate = getCurrentDate()
    // console.log("===============", reqObj)
    Leave.create(reqObj)
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
        .catch(err => console.log("error in leave", err));
})

const showLeavesById = ((req, res) => {
    Leave.findById(req.params.id).populate("userId").lean(true)
        .then((result) => {
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in leave", err));
})

const updateLeaveStatus = ((req, res) => {
    console.log("===============", req.body.admin_response)

    // Leave.findOneAndUpdate({ userId: req.params.id, date: new Date(req.params.date), "Leave._id": req.body._id }, { "Leave.$.status": req.body.status }, { runValidators: true, new: true }).populate("userId")
    Leave.findOneAndUpdate(req.params.id, { admin_response: req.body.admin_response }, { runValidators: true, new: true }).populate("userId")
        .then((result) => {
            // console.log("------->result", result)
            // return
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in leave", err));
})


const controller = {
    addLeaveById: addLeaveById,
    showLeaves: showLeaves,
    updateLeaveStatus: updateLeaveStatus,
    showLeavesById: showLeavesById
};

export default controller;