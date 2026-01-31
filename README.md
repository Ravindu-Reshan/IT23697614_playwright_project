## Playwright Test Automation – SwiftTranslator
## Student Details

Name: Bamunuarachchi R R
Registration Number: IT23697614
Assignment: IT3040 – ITPM Assignment 1

## Project Overview 

This project contains automated tests created using Playwright to validate the Singlish → Sinhala translation functionality of the SwiftTranslator web application:

👉 https://www.swifttranslator.com/

The test suite covers functional correctness, negative scenarios, and UI validations, ensuring the translation system behaves reliably and presents a proper user interface.

## Prerequisites

Before running the tests, make sure you have the following installed:

Node.js (v16 or above)

npm (Node Package Manager)

## Setup & Installation

Clone or download the project repository.

Open a terminal in the project root folder.

## Install project dependencies:

```bash
npm install
```


## Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests
## Run all tests
```bash
npx playwright test
```

## Run all tests and view HTML report
```bash
npx playwright test
npx playwright show-report
```

## Run a specific test file
```bash
npx playwright test tests/translator.spec.js
```

## Run tests in headed mode (browser visible)
```bash
npx playwright test tests/translator.spec.js --headed
```

## Project Structure
```bash
project-root/
├── .github/               # GitHub workflow files (optional)
├── node_modules/          # Installed npm dependencies
├── playwright-report/     # Auto-generated Playwright HTML reports
├── test-results/          # Raw test execution results
├── tests/                 
│   └── example.spec.js    # Main Playwright test file
├── .gitignore             
├── package-lock.json      
├── package.json           
└── playwright.config.js   # Playwright configuration
```

## Test Coverage
Category	Number of Test Cases

✅ Positive Functional Tests	30

❌ Negative Functional Tests	15
🎨 UI Test	1

Total Automated Test Cases	46

## Notes & Highlights

By default, tests execute on Chromium.

HTML test reports are generated automatically after execution.

Screenshots are captured for failed tests to help with debugging.

The framework is scalable, allowing easy addition of new tests in the future.
