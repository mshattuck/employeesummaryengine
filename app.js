//dependancies 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

//array for list of employes
let allEmployees = [];

//starts building employee table starting with Manager type
const buildTemplate = () =>
{ 
        
        inquirer.prompt([
        {
                type: "input",
                message: "Name of Manager: ",
                name: "name"
        },
        {
                type:"number",
                message: "ID number: ",
                name: "id"
        },
        {
                type: "input",
                message: "Email address: ",
                name: "email"
        },
        {
                type: "input",
                message: "Office phone: ",
                name: "phone"
        },
        {
                type: "list",
                message:"Please choose: ",
                choices: ["Add Intern", "Add Engineer", "Publish Employee Chart"],
                name: "action"
        }

        ]).then((prompt) => 
        {       
                //new instance of Manager type employee using above prompts
                const addManager = new Manager(prompt.name, prompt.id, prompt.email, prompt.phone);
                
                //add to allEmployees array
                allEmployees.push(addManager);

                switch(prompt.action)
                {
                        case "Add Intern":
                                inputIntern();
                                break;
                        
                        case "Add Engineer":
                                inputEngineer();
                                break;
                        default:
                                fs.writeFile(outputPath, render(allEmployees), function(err) 
                                        {
                                                if (err){throw err;}
                                        });
                                console.log("HTML file published in the output subfolder.");
                                break;
                }
        });
};

//adds intern type employee to allEmployees
const inputIntern = () => 
{
        inquirer.prompt([
                {
                        type: "input",
                        message: "Name of Intern: ",
                        name: "name"
                },
                {
                        type:"number",
                        message: "ID number: ",
                        name: "id"
                },
                {
                        type: "input",
                        message: "Email address: ",
                        name: "email"
                },
                {
                        type: "input",
                        message: "School: ",
                        name: "school"
                }
        ]).then((prompt) => 
        {       
                //new instance of Intern type employee using above prompts
                const addIntern = new Intern(prompt.name, prompt.id, prompt.email, prompt.school);
                
                //add to allEmployees array
                allEmployees.push(addIntern);

                //choices to add more or print chart
                buildPrompt ();
        });
};


//adds an engineer to allEmployees
const inputEngineer = () => 
{
        inquirer.prompt([
                {
                        type: "input",
                        message: "Name of Engineer: ",
                        name: "name"
                },
                {
                        type:"number",
                        message: "ID number: ",
                        name: "id"
                },
                {
                        type: "input",
                        message: "Email address:",
                        name: "email"
                },
                {
                        type: "input",
                        message: "Github account:",
                        name: "github"
                }
        ]).then((prompt) => 
        {       
                //new instance of Engineer type employee using above prompts
                const addEngineer = new Engineer(prompt.name, prompt.id, prompt.email, prompt.github);
                
                //add to allEmployees array
                allEmployees.push(addEngineer);
                
                //choices to add more or print chart
                buildPrompt ();
        });
};

//options after adding an Engineer or Intern
const buildPrompt = () =>
{
        inquirer.prompt([
        {
                type: "list",
                message: "Please choose:",
                choices: ["Add Intern", "Add Engineer", "Publish Employee Chart"],
                name: "action"
        }
        ]).then((prompt) => 
        {
                switch(prompt.action)
                {
                        case "Add Intern":
                                inputIntern();
                                break;
                        
                        case "Add Engineer":
                                inputEngineer();
                                break;
                        default:
                                fs.writeFile(outputPath, render(allEmployees), function(err) 
                                        {
                                                if (err){throw err;}
                                        });
                                console.log("HTML file published in the output subfolder.");
                                break;
                }
        });
};

//starts program
buildTemplate();
