const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 7003;
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let clientsData = [];

//#Start get region
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/main.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Pages/main.html"));
});

app.get("/Styles/style1.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Styles/style1.css"));
});

app.get("/Scripts/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Scripts/script.js"));
});

app.get("/welcome.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Pages/welcome.html"));
});

app.get("/Styles/style2.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Styles/style2.css"));
});

app.get("/Icons/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Icons/favicon.ico"));
});

app.get("/AllClients.html", (req, res) => {
  fs.readFile("../clients.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).send("Internal Server Error");
    }

    clientsData = JSON.parse(data);

    let table = `<table border="1">
    <tr>
        <th>Name</th>
        <th>Mobile</th>
        <th>Email</th>
        <th>Address</th>
    </tr>`;

    clientsData.forEach((client) => {
      table += `<tr>
        <td>${client.name}</td>
        <td>${client.mobile}</td>
        <td>${client.email}</td>
        <td>${client.address}</td>
    </tr>`;
    });

    table += "</table>";

    fs.readFile(
      path.join(__dirname, "../Client-Side/Pages/AllClients.html"),
      "utf8",
      (err, htmlData) => {
        if (err) {
          console.error("Error reading HTML file:", err);
          return res.status(500).send("Internal Server Error");
        }

        const modifiedHTML = htmlData.replace("{table}", table);
        res.send(modifiedHTML);
      }
    );
  });
});

app.get("/Styles/style3.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Styles/style3.css"));
});
//#End get region

//#Start post region
app.post("/welcome.html", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../Client-Side/Pages/welcome.html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading template file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const { name, mobile, email, address } = req.body;
      let modifiedHTML = data
        .replace("{clientName}", name)
        .replace("{mobileNumber}", mobile)
        .replace("{email}", email)
        .replace("{address}", address);

      clientsData.push(req.body);

      fs.writeFileSync("../clients.json", JSON.stringify(clientsData, null, 2));

      res.send(modifiedHTML);
    }
  );
});
//#end region

//#Start default region
app.all("*", (req, res) => {
  res.send("Please Check ur URL!!");
});
//#End default region

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
