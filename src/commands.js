/**
 * @param { program } : This is an object that allows the specific entry and execution of commands in the console. Module of commander
 * @param program.parse: Convert arguments to required data
 * @param process.argv : property returns an array containing the command-line arguments passed when the Node.js process was launched.
 * The first element will be execPath. The second element will be the path to the JavaScript file being executed. The remaining elements
 * will be any additional command-line arguments.
 * @param program.command(): Define a command, implemented using an action handler.
 * In the name you can also declare the parameters that will be requested in the arrow function of the actio.
 * Such that: program.command("clone <source> [destination]");
 * It requires several parameters(maximum 3, minimum two),
 * which are: name, description(optional) and action(as a parameter it receives an arrow function, which will receive the arguments
 * (source, destination) to perform the action): program.command('name').description("desc").action(() => {});
 * @param prompt: It will allow to work with "inputs"/"prompts" in the console, to be able to read text strings that contain spaces. Module of inquirer.
 *
 */
const { program } = require("commander");
const { prompt } = require("inquirer");
const { addTask, listTasks, findTask, deleteTask, updateTask, } = require("./controllers/task.controllers");

program.version("0.0.1").description("A command line tool for managing tasks");
const taskQuestions = [
  {
    type: "input",
    message: "Task title:",
    name: "title",
  },
  {
    type: "input",
    message: "Task description:",
    name: "description",
  },
];

program
  .command("save")
  .alias("s")
  .description("Save a new record")
  .action(async () => {
    const answers = await prompt(taskQuestions);
    addTask(answers);
  });

program
  .command("list")
  .alias("l")
  .description("List all tasks")
  .action(() => listTasks());

program
  .command("delete <id>")
  .alias("d")
  .description("Delete task")
  .action((_id) => deleteTask(_id));

program
  .command("update <id>")
  .alias("u")
  .description("update task data")
  .action(async (_id) => {
    const answers = await prompt(taskQuestions);
    await updateTask(_id, answers);
  });  

program
  .command("find <search>")
  .alias("f")
  .description("Search for items related to the search parameter")
  .action(async (word) => {findTask(word)});  


program.parse(process.argv);
