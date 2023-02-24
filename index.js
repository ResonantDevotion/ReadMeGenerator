// generate README file using commandd-line application
// include what the app is for, how to use the app, how to install it, how to report issues, and how to make contributions
import inquirer from 'inquirer'
import fs from 'fs'

const mitLicence = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
const apacheLicence = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
const doWhatLicence = '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)'

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

## Installation
${response.installation}

## Usage
${response.usage}

## Licence
This application is covered by the ${response.licence}.

## Contributions
${response.contributions}

## Tests
${response.test}

## Questions
If you have any questions, please contact me through my email:
${response.email}
or go to my github:
https://github.com/${response.github}`;

//inquirer.prompt 
//([{}])
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
            message: 'Whats a description for your project?',
            name: 'description'
        },
        {
            // Installation
            type: 'input',
            message: 'Add your installation instructions..',
            name: 'installation'
        },
        {
            // Usage
            type: 'input',
            message: 'Add your usage instructions',
            name: 'usage'
        },
        {
            // License
            // When a user chooses a license for their application from a list of options
            type: 'list',
            message: 'Add your licence..',
            name: 'licence',
            choices: ['Apache license 2.0', 'MIT licence', 'Do What The F*ck You Want To Public License']
        },
        {
            // Contributing
            type: 'input',
            message: 'Add your contributors',
            name: 'contributions'
        },
        {
            // Tests
            type: 'input',
            message: 'Add your test instructions',
            name: 'test'
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

        const readme = generateReadme(response);
        // if you dont already have a file, create a one with the following
        fs.writeFile(
            // this is the file to be created
            `README.md`,
            readme,
            (err) => err ? console.error(err) : console.log('Success')
        )
    })