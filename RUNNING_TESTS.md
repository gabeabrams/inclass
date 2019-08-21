# Running Tests

This project has multiple types of tests. See each section below for instructions on how to run each type of test.

All commands should be run from the root folder of the project.

## Server Unit Tests

```
npm run test-server
```

## Integration and End-to-end User Tests (Selenium-based)

First, open three terminal tabs and run the following commands, one in each tab:

```
npm run dev:canvas
npm run dev:server-installable
npm run dev:client
```

Second, open yet another terminal window and run the tests:

```
npm run selenium
```

## React Component Unit Tests

```
npm run test-client
```

If tests do not run, this may be because no testable changes have occurred since the last commit. If so, just hit "a" key on your keyboard.
