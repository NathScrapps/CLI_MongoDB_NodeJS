/**
 * handle data events
 * @param Task: is the data model that was created with the schemas based on the mongoose definitions
 * @param connection: The Mongoose module's default connection
 * @param addTask: It is an asynchronous function (it works when it is called in a process and not when
 * it is defined) that receives as parameters the answers that are shown in the "save" command function.
 */

const Task = require("../models/Task");
const { connection } = require("../db");

const addTask = async (task) => {
  await Task.create(task);
  console.log("New Task Created");
  await connection.close();
};

const listTasks = async () => {
  const tasks = await Task.find().lean(); //lean: convert BSON data (mongoDB format) to JSON documents (JavaScript format).
  console.table(
    tasks.map((task) => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
    }))
  );
  await connection.close();
  process.exit(0); // close the node.js thread
};

const findTask = async (word) => {
  const search = new RegExp(word, "i");
  const tasks = await Task.find({
    $or: [{title: search},{description:search}]
  });
  if (tasks.length == 0) {
    console.log("No tasks found");
    await connection.close();
    process.exit(0);
  }
  console.table(
    tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
    }))
  );
  await connection.close();
  process.exit(0);
};

const updateTask = async (_id, newTask) => {
  await Task.updateOne({ _id }, newTask); //* alternative method: await Task.findByIdAndUpdate(_id, newTask);
  console.log("Task updated");
  await connection.close();
};

const deleteTask = async (_id) => {
  await Task.findByIdAndDelete(_id);
  console.log("Task successfully deleted");
  await connection.close();
};


module.exports = {
  addTask,
  findTask,
  listTasks,
  updateTask,
  deleteTask,
};
