const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const wordsList = require("../data.json");
var unirest = require("unirest");

const handleHomeRoute = (request, response) => {
  const indexFilePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(indexFilePath, (err, file) => {
    if (err) {
      console.log(err);
      response.writeHead(500);
      response.end("an error occured");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

const handleDictionary = (request, response) => {
  response.end(JSON.stringify(wordsList));
};

const handleBook = (request, response) => {
  response.writeHead(301, { Location: "/" });
  var allTheData = "";
  request.on("data", function(chunkOfData) {
    allTheData += chunkOfData;
  });
  request.on("end", function() {
    var allTheDataString = queryString.parse(allTheData).myBook;
    
    var req = unirest("POST", "https://googlebooksraygorodskijv1.p.rapidapi.com/getBookshelf"+allTheDataString);
    
    req.headers({
      "x-rapidapi-host": "GoogleBooksraygorodskijV1.p.rapidapi.com",
      "x-rapidapi-key": "03eca7d594msh34ef155af2e0855p1c1bc1jsnc83e871ff4b9",
      "content-type": "application/x-www-form-urlencoded"
    });
    
    req.form({});
    
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
    
      console.log(res.body);
    });
    





    response.end();
  });
};

const handlePublic = (request, response) => {
  const url = request.url;
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon"
  };
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      response.writeHead(500);
      response.end("an error occured");
    } else {
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
    }
  });
};

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleDictionary,
  handleBook
};
