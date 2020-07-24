const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");

const employeeTeam = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function createManager() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is manager's name?",
          validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Please enter first or last name.";
            }
            return true;
        }
        },
        {
          name: "id",
          type: "input",
          message: "What is manager's ID number?",
          validate: async (input) => {
            if (isNaN(input)) {
                return "Please enter a number";
            }
            return true;
        }
        },
        {
          name: "email",
          type: "input",
          message: "What is manager's email?",
          validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address.";
        }
        },
        {
          name: "number",
          type: "input",
          message: "What is the manager's office number?",
          validate: async (input) => {
            if (isNaN(input)) {
                return "Please enter a number";
            }
            return true;
        }
        },
      ])
      .then(function (response) {
        console.log(response);
        const newManager = new Manager(
          response.name,
          response.id,
          response.email,
          response.number
        );
        employeeTeam.push(newManager);
        createTeam();
      });
  }
  createManager();
  
  function createTeam() {
    inquirer
      .prompt([
        {
          name: "addMember",
          type: "list",
          message: "Would you like to add a team member?",
          choices: [
            "Yes, add a Manager",
            "Yes, add an Engineer",
            "Yes, add an Intern",
            "No my team is complete",
          ],
        },
      ])
      .then(function (data) {
        switch (data.addMember) {
          case "Yes, add a Manager":
            createManager();
            break;
          case "Yes, add an Engineer":
            createEngineer();
            break;
          case "Yes, add an Intern":
            createIntern();
            break;
          case "No my team is complete":
            buildTeam();
            break;
        }
      });
  }
  
  function createEngineer() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is engineer's name?",
          validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Please enter first or last name.";
            }
            return true;
        }
        },
        {
          name: "id",
          type: "input",
          message: "What is engineer's ID number?",
          validate: async (input) => {
            if (isNaN(input)) {
                return "Please enter a number";
            }
            return true;
        }
        },
        {
          name: "email",
          type: "input",
          message: "What is engineer's email?",
          validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address.";
        }
        },
        {
          name: "github",
          type: "input",
          message: "What is the engineer's GitHub username?",
        },
      ])
      .then(function (response) {
        const newEngineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        );
        employeeTeam.push(newEngineer);
        createTeam();
      });
  }
  
  function createIntern() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is intern's name?",
          validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Please enter first or last name.";
            }
            return true;
        }
        },
        {
          name: "id",
          type: "input",
          message: "What is intern's ID number?",
          validate: async (input) => {
            if (isNaN(input)) {
                return "Please enter a number";
            }
            return true;
        }
        },
        {
          name: "email",
          type: "input",
          message: "What is intern's email?",
          validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address.";
        }
        },
        {
          name: "school",
          type: "input",
          message: "What school did the intern attend?",
        },
      ])
      .then(function (response) {
        const newIntern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        employeeTeam.push(newIntern);
        createTeam();
      });
  }
    
  function buildTeam() {
    fs.writeFileSync(outputPath, render(employeeTeam), "utf8");
  }
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```