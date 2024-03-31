const myMod = require("./Modules/myModule");

let MyTicketsReservation = myMod.TicketsReservation;

myObj = new MyTicketsReservation();

console.log(myObj.display());

console.log(myObj.get("EK123"));

console.log(
  myObj.update("EK123", { seatNum: "20c", travelingDate: "2024-12-1T06:00:00" })
);
console.log(myObj.display());
