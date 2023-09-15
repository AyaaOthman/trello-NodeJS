import taskModel from "../../db/models/task.model.js";
import userModel from "../../db/models/user.model.js";
import jwt from "jsonwebtoken";

const addTask = async (req, res) => {
  const { userId } = req.params;
  const { assignTo } = req.body;
  const user = await userModel.findById(userId);
  const assignedToUSer = await userModel.findById(assignTo);
  if (user && assignedToUSer) {
    const newTask = await taskModel.insertMany({
      ...req.body,
      userId: user,
      assignTo: assignedToUSer,
    });
    res.status(201).json({ msg: "added", newTask });
  } else {
    res.json({ msg: "user isn't found! " });
  }
};

const updateTask = async (req, res) => {
  const { token } = req.headers;
  const { taskId } = req.params;
  const task = await taskModel.findById(taskId);
  if (task) {
    const task = await taskModel.findById(taskId).populate("userId");
    const { id } = jwt.verify(token, "7amada");
    const taskCreator = await userModel.findById(id);
    if (task.userId.email === taskCreator.email) {
      const { status, title, description } = req.body;
      const task = await taskModel.findByIdAndUpdate(
        taskId,
        {
          ...req.body,
          status: status,
          title: title,
          description: description,
        },
        { new: true }
      );
      res.status(201).json({ msg: "Task updated", task });
    }
  } else {
    res.status(404).json({ msg: "task not found" });
  }
};

const deleteTask = async (req, res) => {
  const { token } = req.headers;
  const { taskId } = req.params;
  const task = await taskModel.findById(taskId);
  if (task) {
    const task = await taskModel.findById(taskId).populate("userId");
    const { id } = jwt.verify(token, "7amada");
    const taskCreator = await userModel.findById(id);
    if (task.userId.email === taskCreator.email) {
      const { status, title, description } = req.body;
      const task = await taskModel.findByIdAndDelete(taskId);
      res.status(201).json({ msg: "Task deleted", task });
    }
  } else {
    res.status(404).json({ msg: "task not found" });
  }
};

const getAllTasks = async (req, res) => {
  const tasks = await taskModel.find().populate("userId").populate("assignTo");
  res.json({ msg: "all tasks", tasks });
};

const getAllTasksNotDone = async (req, res) => {
  const task = await taskModel.find({
    $and: [{ deadLine: { $lt: new Date() } }, { status: "toDo" }],
  });
  res.json({ msg: "unfinished Task", task });
};

export { addTask, updateTask, deleteTask, getAllTasks, getAllTasksNotDone };
