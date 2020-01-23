const handlers = require("./handlers");

const router = (request, response) => {
  const url = request.url;
  console.log(url);
  if (url === "/") {
    handlers.handleHomeRoute(request, response);
  } else if (url.indexOf("/public/") !== -1) {
    handlers.handlePublic(request, response);
  } else if (url.indexOf("/searchVal") === 0) {
    handlers.handleSearchVal(request, response);
  } else if (url.indexOf("/book") === 0) {
    handlers.handleBook(request, response);
  } else {
    response.writeHead(404);
    response.end("there is no such url");
  }
};

module.exports = router;
