const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeTeam = [];

// create a new Manager using inquire/console log prompts
function createManager() {
    inquirer
        .prompt([{
                name: "teamname",
                type: "input",
                message: "What is your team's name?",
                validate: async (input) => {
                    if (input == "" || /\s/.test(input)) {
                        return "Please enter team name.";
                    }
                    return true;
                }
            },
            {
                name: "name",
                type: "input",
                message: "What is the team manager's name?",
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
                message: "What is the team manager's ID number?",
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
                message: "What is the team manager's email?",
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
        .then(function(response) {
            console.log(response);
            const newManager = new Manager(
                response.teamname,
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
// end create Manager function

// prompts for adding other team members
function createTeam() {
    inquirer
        .prompt([{
            name: "addMember",
            type: "list",
            message: "Would you like to add a team member?",
            choices: [
                "Yes, add a Manager",
                "Yes, add an Engineer",
                "Yes, add an Intern",
                "No my team is complete",
            ],
        }, ])
        .then(function(data) {
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
// end prompts for adding new team members

// add an engineer to the team function  
function createEngineer() {
    inquirer
        .prompt([{
                name: "name",
                type: "input",
                message: "What is the engineer's name?",
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
                message: "What is the engineer's ID number?",
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
                message: "What is the engineer's email?",
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
        .then(function(response) {
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
// Engineer function end

// Add an intern to the team function  
function createIntern() {
    inquirer
        .prompt([{
                name: "name",
                type: "input",
                message: "What is the intern's name?",
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
                message: "What is the intern's ID number?",
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
                message: "What is the intern's email?",
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
        .then(function(response) {
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
// add a new intern function end

// function to create team
function buildTeam() {
    fs.writeFileSync(outputPath, render(employeeTeam), "utf8");
}
// render team results to the output directory and write to html file 'team'