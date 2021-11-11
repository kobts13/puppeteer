const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello!",
    })
  );
});

server.listen(8083);
console.log("Listening on port " + 8083);
