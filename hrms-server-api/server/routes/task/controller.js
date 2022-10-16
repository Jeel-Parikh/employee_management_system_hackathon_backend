import Task from "../../models/Task";
import getCurrentDate from "../../services/date";

const addTaskById = (req, res) => {
	Task.findOne({ userId: req.params.id, date: getCurrentDate(new Date()) })
		.then((result) => {
			Task.findByIdAndUpdate(result._id, {
				$push: {
					task: {
						title: req.body.title,
						description: req.body.description,
						date: Date.now(),
						status: req.body.status,
					},
				},
			})
				.then((resul) => {
					Task.findOne({ _id: resul._id })
						.populate("userId")
						.then((result) => {
							res.json({ response: true, result: result });
						})

						.catch((err) => console.log("error", err));
				})

				.catch((err) => console.log("error in addTask", err));
		})

		.catch((e) => {
			// Task.create({ userId: req.params.id, task: { title: req.body.title, description: req.body.description, date: Date.now(), status: req.body.status }, date: getCurrentDate() })

			Task.create({ userId: req.params.id,task: { title: req.body.title, description: req.body.description, date: Date.now(), status: req.body.status, }, date: getCurrentDate(new Date()),
			})

				.then((resul) => {
					Task.findOne({ _id: resul._id })
						.populate("userId")
						.then((result) => {
							res.json({ response: true, result: result });
						})

						.catch((err) => console.log("error", err));
				})

				.catch((err) => console.log("error in addTask", err));
		});
};

const showTasks = (req, res) => {
	Task.find()
		.populate("userId")
		.lean(true)
		.then((result) => {
			res.json({ response: true, result: result });
		})
		.catch((err) => console.log("error in addUserDetail", err));
};

const showTaskById = (req, res) => {
	Task.find({ userId: req.params.id })
		.populate("userId")
		.then((result) => {
			res.json({ response: true, result: result });
		})
		.catch((err) => console.log("error in addUserDetail", err));
};

const showTaskByIdAndDate = (req, res) => {
	// console.log("req.params.date", new Date(req.params.date))

	Task.findOne({ userId: req.params.id, date: new Date(req.params.date) })
		.populate("userId")
		.then((result) => {
			res.json({ response: true, result: result });
		})
		.catch((err) => console.log("error in addUserDetail", err));
};

const updateTaskStatus = (req, res) => {
	// console.log("req.params.date", new Date(req.params.date))
	console.log("req.body.id---->", req.params.id);

	// Task.findOneAndUpdate({ userId: req.params.id, date: new Date(req.params.date), "task._id": req.body._id }, { "task.$.status": req.body.status }, { runValidators: true, new: true }).populate("userId")
	Task.findOneAndUpdate(
		{ "task._id": req.params.id },
		{ "task.$.status": req.body.status },
		{ runValidators: true, new: true }
	)
		.populate("userId")
		.then((result) => {
			// console.log("------->result", result)
			// return
			res.json({ response: true, result: result });
		})
		.catch((err) => console.log("error in addUserDetail", err));
};

const controller = {
	addTaskById: addTaskById,
	showTaskById: showTaskById,
	showTasks: showTasks,
	showTaskByIdAndDate: showTaskByIdAndDate,
	updateTaskStatus: updateTaskStatus,
};

export default controller;
