import Leave from "../../models/Leave"
import User from "../../models/User"
import getCurrentDate from "../../services/date"

const addLeaveById = ((req, res) => {
    // const { startDate, endDate,reason,title,admin_response,type } = req.body
    let reqObj = req.body
    reqObj.userId = req.params.id
    reqObj.appliedDate = getCurrentDate(new Date())
    const totalDays = Math.abs(Math.ceil((new Date(reqObj.endDate).getTime() - new Date(reqObj.startDate).getTime()) / (1000 * 3600 * 24)))
    Leave.find({
        userId: req.params.id, appliedDate: {
            $gte: new Date(reqObj.appliedDate.getFullYear(), 0, 1),
            $lte: new Date(reqObj.appliedDate.getFullYear(), 11, 31)
        }
    })
        .then((result) => {
            let total = 0
            for (let i of result) {
                total += i.totalDays
            }
            if (total + totalDays > 12 && res.locals.designation != 'admin') {
                return res.json({ response: false, result: "you have exceeded your limit of 12 paid leaves." })
            }
            reqObj.totalDays = totalDays
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
    // console.log("===============", reqObj)


})


const showLeaves = ((req, res) => {
    Leave.find().populate("userId")
        .then((result) => {
            // console.log(result)
            res.json({ response: true, result: JSON.stringify(result) });
        })
        .catch(err => console.log("error in leave", err));
})

const showLeavesById = ((req, res) => {
    Leave.find({ userId: req.params.id }).populate("userId").lean(true)
        .then((result) => {
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in leave", err));
})

const updateLeaveStatus = ((req, res) => {
    // console.log("===============", req.body.admin_response)

    // Leave.findOneAndUpdate({ userId: req.params.id, date: new Date(req.params.date), "Leave._id": req.body._id }, { "Leave.$.status": req.body.status }, { runValidators: true, new: true }).populate("userId")
    Leave.findByIdAndUpdate(req.params.id, { admin_response: req.body.admin_response }, { runValidators: true, new: true }).populate("userId")
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