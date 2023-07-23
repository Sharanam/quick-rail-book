const { consoleTricks } = require("./regular");

function networkLogger(page) {
  page.on("request", (request) => {
    console.log(
      consoleTricks.dim,
      "<<",
      request.method(),
      request.url(),
      request.resourceType(),
      request.postData() || "",
      consoleTricks.reset
    );
  });
  page.on("response", (response) => {
    console.log(
      consoleTricks.dim,
      ">>",
      response.status(),
      response.url(),
      consoleTricks.reset
    );
  });
}

module.exports = networkLogger;
