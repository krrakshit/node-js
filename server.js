const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express")

const app = express()
app.get('/',(req,res)=>{
    return res.send("Hello from Home page")
})

app.get("/about",(req,res)=>{
    return res.send("Hello from About page"+req.query.name + "you are" + req.query.age
        
    )
})

function myhandler(req, res) {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()} : ${req.method}${req.url}  New Request Recieved\n`;
  const myurl = url.parse(req.url, true);
  console.log(myurl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myurl.pathname) {
      case "/":
        if (req.method === "GET") res.end("homepage");
        break;
      case "/about":
        const username = myurl.query.myname;

        res.end(`Hi, ${username}`);
        break;
      case "/search":
        const search = myurl.query.search_query;
        res.end(`You searched for ${search}`);
      case "/signup":
        if (req.method === "POST") {
          res.end("Sucess");
        }
      default:
        res.end("404 Not found");
    }
  });
}

const myserver = http.createServer(app);

myserver.listen(8000, () => console.log("server started"));
