const request = require('request');
const fs = require('fs');

let requestForURL;
let path;

if (process.argv[2] && process.argv[3]) {
  requestForURL = process.argv[2];
  path = process.argv[3];
} else {
  console.log("You're missing a parameter.");
  return;
}

const makeRequest = (saveData) => {
  request(requestForURL, (error, response, body) => {
    if (error) {
      console.log('The URL is not working' + error);
    } else if (response.statusCode !== 200) {
      console.log('This page does not exist');
    } else {
      saveData(body);
    }
  });
};

const writeFile = (data) => {
  fs.writeFile(path, data, (error) => {
    if (error) {
      console.log('Something went wrong while the file was being written \n' + error);
    } else {
      console.log(`Downloaded and saved ${fs.statSync(path).size} bytes to ${path}`);
    }
  });
}

makeRequest(writeFile);