// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = ['What is your GitHub username?','What is your email address?',
    "What is your project's name?",'Please write a short description of your project',
    'What kind of license should your project have?','What command should be run to install dependencies?',
    'What command should be run to run tests?','What does the user need to know about using the repo?',
    'What does the user need to know about contributing to the repo?'
];

function license(input){
  switch(input) {
    //'', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'
    case 'MIT':
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';

    case 'APACHE 2.0':
      return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    case 'GPL 3.0':
      return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
    case 'BSD 3':
      return '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
    default:
      return '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
  }
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync("./" + fileName,
        `# ${data.title}`+ "\n" +
        license(data.license) + "\n\n"+
        "## Description \n\n" +
        `${data.description} \n\n` +
        "## Table of Contents \n\n" +
        "* [Installation](#installation)\n\n" +
        "* [Usage](#usage)\n\n" +
        "* [License](#license)\n\n" +
        "* [Contributing](#contributing)\n\n" +
        "* [Tests](#tests)\n\n" +
        "* [Questions](#questions)\n\n" +
        "## Installation \n\n" +
        "To install necessary dependencies, run the following command:\n" +
        "```bash" + "\n" +
        `${data.installation}\n` + 
        "```" + "\n\n"+
        "## Usage\n" + 
        `${data.usage}\n\n` +
        "## License \n\n" +
        `${data.license} \n\n` + 
        "## Contributing\n\n" + 
        `${data.contributing} \n\n`+
        "## Tests\n\n" +
        "To run tests, run the following command:\n"+
        "```bash\n" +
        ` ${data.test} \n\n` + 
        "```\n\n" +
        "## Questions\n\n" +  
        "If you have any questions about the repo, open an issue or contact me directly at " + 
        data.github + 
        ". You can find more of my work at [" +
        data.email + 
        "](https://github.com/" + 
        data.github + 
        "/)."
      );
}

// TODO: Create a function to initialize app
function init() {
    
    inquirer.prompt(
      [
          {
            type: 'input',
            name: 'github',
            message: questions[0],
          },
          {
            type: 'input',
            name: 'email',
            message: questions[1],
          },
          {
            type: 'input',
            name: 'title',
            message: questions[2],
          },
          {
            type: 'input',
            name: 'description',
            message: questions[3],
          },
          {
            type: 'list',
            name: 'license',
            message: questions[4],
            choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
          },
          {
            type: 'input',
            name: 'installation',
            message: questions[5],
            default: 'npm i',
          },
          {
            type: 'input',
            name: 'test',
            message: questions[6],
            default: 'npm test',
          },
          {
            type: 'input',
            name: 'usage',
            message: questions[7],
          },
          {
            type: 'input',
            name: 'contributing',
            message: questions[8],
          },
      ]
    ).then((responses) => {
        writeToFile('README.md', responses);
    });
}

// Function call to initialize app
init();
