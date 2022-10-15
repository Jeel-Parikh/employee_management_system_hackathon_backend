import Attendance from "../../models/Attendance"
import getCurrentDate from "../../services/date"

const addAttendanceById = ((req, res) => {

    Attendance.create({ userId: req.params.id, date: getCurrentDate(), status: req.body.status })

        .then((resul) => {

            Attendance.findOne({ "_id": resul._id }).populate("userId")
                .then((result) => {
                    res.json({ response: true, result: result })
                })

                .catch(err => console.log('error', err))
        })

        .catch(err => console.log("error in markAttendance", err));

})

const showAttendance = ((req, res) => {
    Attendance.find().populate("userId").lean(true)
        .then((result) => {
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in addUserDetail", err));
})


const showAttendanceById = ((req, res) => {
    Attendance.find({ userId: req.params.id }).populate("userId")
        .then((result) => {
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in addUserDetail", err));
})


const showAttendanceByIdAndDate = ((req, res) => {

    Attendance.findOne({ userId: req.params.id, date: new Date('"' + req.body.date + '"') }).populate("userId")
        .then((result) => {
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in show attendance", err));
})

const showAttendanceByIdAndMonth = ((req, res) => {

    Attendance.find({ userId: req.params.id, status: true, "$expr": { "$eq": [{ "$month": "$date" }, Number(req.params.month)] } }).count()
        .then((result) => {
            res.json({ response: true, result: result });
        })
        .catch(err => console.log("error in addUserDetail", err));
})


const controller = {
    addAttendanceById: addAttendanceById,
    showAttendance: showAttendance,
    showAttendanceById: showAttendanceById,
    showAttendanceByIdAndDate: showAttendanceByIdAndDate,
    showAttendanceByIdAndMonth: showAttendanceByIdAndMonth
};

export default controller;