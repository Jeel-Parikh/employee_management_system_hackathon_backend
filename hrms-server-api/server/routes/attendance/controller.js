import Attendance from "../../models/Attendance"
import getCurrentDate from "../../services/date"

const addAttendanceById = (async (req, res) => {

    const { data } = req.body
    const addUser = (id) => {
        Attendance.create({ userId: id, date: getCurrentDate(), status: data[id] })

            .then((resul) => {

                Attendance.findOne({ "_id": resul._id }).populate("userId")
                    .then((result) => {
                        res.json({ response: true, result: result })
                    })

                    .catch(err => console.log('error', err))
            })

            .catch(err => console.log("error in markAttendance", err));
    }
    for (let i in data) {
        await addUser(i)
    }

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

            res.json({ response: true, result: data });
        })
        .catch(err => console.log("error in show attendance", err));
})

const showAttendanceByIdAndMonthAndYear = ((req, res) => {

    Attendance.find({
        userId: req.params.id, status: true, "$expr": { "$and": [{ "$eq": [{ "$month": "$date" }, Number(req.params.month)] }, { "$eq": [{ "$year": "$date" }, Number(req.params.year)] }] }
    })
        .then((result) => {

            let date = new Date(`${req.params.month}-01-${req.params.year}`)

            // let dataObj =
            let data = result.map((key) => ({
                [key.date.getDate()]: key.status
            }))
            let dataObj = Object.assign({}, ...data)
            res.json({ response: true, result: dataObj, firstDay: date.getDay() });
        })
        .catch(err => console.log("error in addUserDetail", err));
})


const controller = {
    addAttendanceById: addAttendanceById,
    showAttendance: showAttendance,
    showAttendanceById: showAttendanceById,
    showAttendanceByIdAndDate: showAttendanceByIdAndDate,
    showAttendanceByIdAndMonthAndYear: showAttendanceByIdAndMonthAndYear
};

export default controller;