import express from "express";
import authorization from "../../middleware/autorization.js";
import {
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getAllTasksNotDone,
} from "./task.controller.js";
const taskRoute = express.Router();

taskRoute.post("/addTask/:userId", authorization, addTask);
taskRoute.patch("/updateTask/:taskId", authorization, updateTask);
taskRoute.delete("/deleteTask/:taskId", authorization, deleteTask);
taskRoute.get("/allTasksWithUsers", getAllTasks);
taskRoute.get("/getAllTasksNotDone", getAllTasksNotDone);
export default taskRoute;
