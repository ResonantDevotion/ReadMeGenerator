// generate README file using commandd-line application
// include what the app is for, how to use the app, how to install it, how to report issues, and how to make contributions
import inquirer from 'inquirer'
import fs from 'fs'

// variables containing the markdown syntax of the licence badges.
const mitLicence = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
const apacheLicence = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
const doWhatLicence = '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)'

// function that inputs the licence badge related to the chosen licence
const licenceBadge = (response) => {
    const choice = ['Apache license 2.0', 'MIT licence', 'Do What The F*ck You Want To Public License'];
    if (response.licence === choice[0]) {
        return apacheLicence;
    }
    else if (response.licence === choice[1]) {
        return mitLicence;
    }
    else {
        return doWhatLicence;
    };
};


// this is the function of the file structure
const generateReadme = (response) =>
    // gotta use the weird quotes
    // When a user enters the project title then it is displayed as the title of the README
    // When a user enters a description, installation instructions, usage information, contribution guidelines and test instructions then this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests, 
    `# Title
${response.title}
` +
    licenceBadge(response)
    +
    `
## Description
${response.description}

## Contents
[- Installation](#installation)

[- Usage](#usage)

[- Licence](#licence)

[- Contributions](#contributions)

[- Tests](#tests)

[- Credits](#credits)

## Installation
The steps required to install this application are:
${response.installation}

## Usage
To use the app follow these instructions:
${response.usage}

## Licence
This application is covered by the ${response.licence}. 
As shown in the badge displayed in the title. 

## Contributions
If you would like to contribute please contact me through my email:
${response.contributions}

## Tests
Please follow the following instructions to test the application:
${response.test}

## Credits
I would like to give credits to:
${response.credits}
For the https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba

## Questions
If you have any additional questions, please contact me through my email:
${response.email}
or go to my github:
https://github.com/${response.github}`;

//inquirer.prompt 
// ([{}]) syntax
inquirer
    .prompt([
        {
            // The title of my project
            type: 'input',
            message: 'Whats is your projects title?',
            name: 'title'
        },
        {
            // Description
            type: 'input',
            message: 'Whats a description for your project? ' + 'Tip: What was your motivation? What problem did it solve? What did you learn?',
            name: 'description'
        },
        {
            // Installation
            type: 'input',
            message: 'Add installation instructions..',
            name: 'installation'
        },
        {
            // Usage
            type: 'input',
            message: 'Add usage instructions and screenshots of your application',
            name: 'usage'
        },
        {
            // License
            // When a user chooses a license for their application from a list of options
            type: 'list',
            message: 'What licence would you like to have?',
            name: 'licence',
            choices: ['Apache license 2.0', 'MIT licence', 'Do What The F*ck You Want To Public License']
        },
        {
            // Contributing
            type: 'input',
            message: 'Would you like others to contribute? If so list how they can do so here:',
            name: 'contributions'
        },
        {
            // Tests
            type: 'input',
            message: 'How could your app be tested? Write it here:',
            name: 'test'
        },
        {
            // Credits
            type: 'input',
            message: 'Add your collaborators or resources used to craete your app:',
            name: 'credits'
        },
        {
            // Github username
            type: 'input',
            message: 'What is your github username?',
            name: 'github'
        },
        {
            // email
            type: 'input',
            message: 'What is your email?',
            name: 'email'
        }
    ])
    //promise to use a function on the response
    .then((response) => {
        // creates a variable to pull the global scope function into this promise
        const readme = generateReadme(response);
        // if there isnt already have a file, it will create one with the following
        fs.writeFile(
            // this is the file to be created
            `README.md`,
            // this is what will be in the file (pulls the previously mentioned variable/function)
            readme,
            // this is a validation, if there is an error it will console else, success will be consoled.
            (err) => err ? console.error(err) : console.log('Success')
        )
    })