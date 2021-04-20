const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

const fs = require("fs");
const path = require("path");

const teamsEmployee = [];

const questionsManager = [
    {
        type: "input",
        name: "name",
        message: "What is Manager name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is Manager id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is Manager email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is Manager officeNumber?"
    }
];

const questionsIntern = [
    {
        type: "input",
        name: "name",
        message: "What is Intern name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is Intern id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is Intern email?"
    },
    {
        type: "input",
        name: "school",
        message: "What is Intern school?"
    }
];

const questionsEngineer = [
    {
        type: "input",
        name: "name",
        message: "What is Engineer name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is Engineer id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is Engineer email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is Engineer github?"
    }
];

const createManager = () => {
    //collect the answers
    inquirer.prompt(questionsManager).then((answers) => {
        //use answers to create Manager object
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        //push new Manager obj to teams array
        teamsEmployee.push(newManager);
        //ask do you want more teams?
        addEmployee();
    })
}

const createIntern = () => {
    //collect the answers
    inquirer.prompt(questionsIntern).then((answers) => {
        //use answers to create Intern object
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        //push new Intern obj to teams array
        teamsEmployee.push(newIntern);
        //ask do you want more teams?
        addEmployee();
    })
}

const createEngineer = () => {
    //collect the answers
    inquirer.prompt(questionsEngineer).then((answers) => {
        //use answers to create Engineer object
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        //push new Engineer obj to teams array
        teamsEmployee.push(newEngineer);
        //ask do you want more teams?
        addEmployee();
    })
}

const addEmployee = () => {
    inquirer.prompt([{
        type: "list",
        name: "pick",
        message: "What do you want to add?",
        choices: ["Manager", "Intern", "Engineer", "Please no more!"]
    }]).then((answer) => {
        switch (answer.pick) {
            case "Manager":
                createManager();
                break;
            case "Intern":
                createIntern();
                break;
            case "Engineer":
                createEngineer();
                break;
            default:
                endGame();
                break;
        }
    });
}

const generateTeamEmployeeHTMLString = (teamEmployee) => {
    const htmlTeam = teamEmployee.map((employee) => {
        switch (employee.getRole()) {
            case "Manager":
                return `
                <div class="row">
                    <div class="manager">Manager</div>
                    <div>${employee.getName()}</div>
                    <div>${employee.getId()}</div>
                    <div>${employee.getEmail()}</div>
                    <div>${employee.getOfficeNumber()}</div>
                    </div>
                `;
            case "Intern":
                return `
                <div class="row">
                <div class="intern">Intern</div>
                    <div>${employee.getName()}</div>
                    <div>${employee.getId()}</div>
                    <div>${employee.getEmail()}</div>
                    <div>${employee.getSchool()}</div>
                    </div>
                `;
            case "Engineer":
                return `
                <div class="row">
                <div class="engineer">Engineer</div>
                    <div>${employee.getName()}</div>
                    <div>${employee.getId()}</div>
                    <div>${employee.getEmail()}</div>
                    <div>${employee.getGitHub()}</div>
                    </div>
                `;
            default:
                break;
        }
    })


    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Generator</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>

        <style>
            h1 {
                font-weight: bold;
                text-align: center;
                background-color: cornflowerblue;
            }
            .row {
                display:inline-block;
                position: relative;
                margin: 5px;
                left: 200px;
                width:25%;
                height:200px;
                background-color: lightgrey;
            }
    
            .manager {
                text-align: center;
                background-color: orange;
            }
    
            .intern {
                text-align: center;
                background-color: lavender;
            }
    
            .engineer {
                text-align: center;
                background-color: pink;
            }
        </style>
    </head>

    <body>
        <h1>My Team</h1>
    ${htmlTeam.join("")}
        
    </body>
    </html>
    `;
}

const endGame = () => {
    fs.writeFileSync(path.join(__dirname, "output/teamEmployee.html"), generateTeamEmployeeHTMLString(teamsEmployee), "utf8");
}

//start app here
addEmployee();