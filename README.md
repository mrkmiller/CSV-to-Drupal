# Example CSV import into Drupal

This is just some example code for taking a local CSV file and importing each row as a node into Drupal.

## Setup

1. Ensure Drupal is ready to import data.

Also, on the drupal site be sure to have the `JSON:API` and `HTTP Basic Authentication` modules enabled.
Then on the JsonAPI config page `/admin/config/services/jsonapi`, "Accept all JSON:API create, read, update, and delete operations." needs to be selected.

2. Installation of Node.js packages.
```
npm install
```

3. Edit the `index.js` file to reflect your custom info.

Change variable values for the __CSV file__ location, __Url__, __Username/Password__, and Drupal __Entity Type__.

Add any __Fields__ needed by the Drupal entity into the `prepareNodes()` function.

## Running the Import

1. Test the CSV parsing.
```
npm test
```

2. Import the files into Drupal.
```
npm start
```
