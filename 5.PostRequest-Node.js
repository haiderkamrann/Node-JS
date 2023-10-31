const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Post Request</title></head>");
    res.write(
      '<body> <form action ="/message" method="POST"> <input type = "text" name = "message"> <button type = "submit">Send</button></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on('data', (chunk) => {
        // console.log(chunk);
        body.push(chunk);
    });
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        // console.log(parsedBody);
        const message = parsedBody.split('=')[1];
        fs.writeFileSync("message.txt", message);
    })
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
