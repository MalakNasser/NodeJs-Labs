const http = require("http");
const fs = require("fs");

var MainHTML = fs.readFileSync("../Client-Side/Pages/main.html", "utf-8");
var Style1CSS = fs.readFileSync("../Client-Side/Styles/style1.css", "utf-8");
var Style2CSS = fs.readFileSync("../Client-Side/Styles/style2.css", "utf-8");
var ScriptJS = fs.readFileSync("../Client-Side/Scripts/script.js", "utf-8");
var FavIconico = fs.readFileSync("../Client-Side/Icons/favicon.ico");
var WelocmeHTML = fs.readFileSync("../Client-Side/Pages/welcome.html", "utf-8");

http
  .createServer((req, res) => {
    //#Start region GET
    if (req.method == "GET") {
      switch (req.url) {
        case "/":
        case "/main.html":
        case "/Pages/main.html":
        case "/Client-Side/Pages/main.html":
          res.setHeader("Content-Type", "text/html");
          res.write(MainHTML);
          break;
        case "/style1.css":
        case "/Styles/style1.css":
        case "/Client-Side/Styles/style1.css":
          res.setHeader("Content-Type", "text/css");
          res.write(Style1CSS);
          break;
        case "/style2.css":
        case "/Styles/style2.css":
        case "/Client-Side/Styles/style2.css":
          res.setHeader("Content-Type", "text/css");
          res.write(Style2CSS);
          break;
        case "/script.js":
        case "/Scripts/script.js":
        case "/Client-Side/Scripts/script.js":
          res.setHeader("Content-Type", "text/javascript");
          res.write(ScriptJS);
          break;
        case "/favicon.ico":
        case "/Icons/favicon.ico":
        case "/Client-Side/Icons/favicon.ico":
          res.setHeader("Content-Type", "image/vnd.microsoft.icon");
          res.write(FavIconico);
          break;
        default:
          if (req.url.includes("welcome.html")) {
            res.setHeader("Content-Type", "text/html");
            res.write(WelocmeHTML);
          } else res.write("Invalid URL !!");
          break;
      }
      res.end();
    }
    //#end region
    //#start region POST
    else if (req.method == "POST") {
      let Name = "";
      let Mobile = "";
      let Email = "";
      let Address = "";
      req.on("data", (data) => {
        let userData = data.toString();
        let userDataArr = userData.split("&");
        Name = userDataArr[0].split("=")[1].replace(/\+/g, " ");
        Mobile = userDataArr[1].split("=")[1];
        Email = userDataArr[2].split("=")[1].replace(/%40/g, "@");
        Address = userDataArr[3].split("=")[1].replace(/\+/g, " ");
      });

      req.on("end", () => {
        res.setHeader("Content-Type", "text/html");
        res.write(
          WelocmeHTML.replace("{clientName}", Name)
            .replace("{mobileNumber}", Mobile)
            .replace("{email}", Email)
            .replace("{address}", Address)
        );
        res.end();
      });
    }
    //#end region
    //#start region Default
    else {
      res.end("Please Check ur Method [GET - POST]");
    }
    //#end region
  })
  .listen(7000, () => {
    console.log("http://localhost:7000");
  });
