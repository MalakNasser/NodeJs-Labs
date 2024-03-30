const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    if (req.url != "/favicon.ico") {
      const url = req.url;
      const splittedUrl = url.split("/");
      let result;
      let outputText = "";

      switch (splittedUrl[1].toLowerCase()) {
        case "add":
          result = parseInt(splittedUrl[2]);
          outputText += `${splittedUrl[2]} + `;
          for (let i = 3; i < splittedUrl.length; i++) {
            result += parseInt(splittedUrl[i]);
            outputText += `${splittedUrl[i]} + `;
          }
          break;
        case "subtract":
          result = parseInt(splittedUrl[2]);
          outputText += `${splittedUrl[2]} - `;
          for (let i = 3; i < splittedUrl.length; i++) {
            result -= parseInt(splittedUrl[i]);
            outputText += `${splittedUrl[i]} - `;
          }
          break;
        case "multiply":
          result = parseInt(splittedUrl[2]);
          outputText += `${splittedUrl[2]} * `;
          for (let i = 3; i < splittedUrl.length; i++) {
            result *= parseInt(splittedUrl[i]);
            outputText += `${splittedUrl[i]} * `;
          }
          break;
        case "divide":
          result = parseInt(splittedUrl[2]);
          outputText += `${splittedUrl[2]} / `;
          for (let i = 3; i < splittedUrl.length; i++) {
            const operand = parseInt(splittedUrl[i]);
            if (operand === 0) {
              outputText = "Error: Division by zero.\n";
              break;
            }
            result /= operand;
            outputText += `${splittedUrl[i]} / `;
          }
          break;
        default:
          outputText = "Invalid operation.\n";
          break;
      }

      if (
        outputText !== "Invalid operation.\n" &&
        outputText !== "Error: Division by zero.\n"
      ) {
        outputText = outputText.slice(0, -3);
        outputText += ` = ${result}\n`;
      }

      fs.appendFile("operations.txt", outputText, (err) => {
        if (err) {
          console.log("Error appending to file.");
        }
        console.log("Output text appended to file.");
      });
    }
    res.end();
  })
  .listen(7000);
