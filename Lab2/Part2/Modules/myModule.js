class TicketsReservation {
  #tickets = [
    {
      seatNum: "1A",
      flightNum: "EK123",
      departure: "Dubai International Airport (DXB)",
      arrival: "Heathrow Airport (LHR)",
      travelingDate: "2024-10-10T08:00:00",
    },
    {
      seatNum: "14C",
      flightNum: "QR456",
      departure: "Hamad International Airport (DOH)",
      arrival: "JFK Airport (JFK)",
      travelingDate: "2024-11-15T14:30:00",
    },
    {
      seatNum: "7F",
      flightNum: "SQ789",
      departure: "Changi Airport (SIN)",
      arrival: "Sydney Kingsford Smith Airport (SYD)",
      travelingDate: "2024-01-20T10:45:00",
    },
  ];

  display() {
    let flights = "";
    for (let i = 0; i < this.#tickets.length; i++) {
      flights += `Seat Number: ${this.#tickets[i].seatNum}, Flight Number: ${
        this.#tickets[i].flightNum
      }, Departure: ${this.#tickets[i].departure}, Arrival: ${
        this.#tickets[i].arrival
      }, Traveling Date: ${this.#tickets[i].travelingDate}\n`;
    }
    return flights;
  }

  get(flightNum) {
    let flight = "";
    let flightIndex = this.#tickets.findIndex(
      (ticket) => ticket.flightNum === flightNum
    );

    if (flightIndex !== -1) {
      flight += `Seat Number: ${
        this.#tickets[flightIndex].seatNum
      }, Flight Number: ${this.#tickets[flightIndex].flightNum}, Departure: ${
        this.#tickets[flightIndex].departure
      }, Arrival: ${this.#tickets[flightIndex].arrival}, Traveling Date: ${
        this.#tickets[flightIndex].travelingDate
      }\n`;
    } else {
      flight = "Flight not found\n";
    }
    return flight;
  }

  update(flightNum, toUpdate) {
    let message = "";
    let flightIndex = this.#tickets.findIndex(
      (ticket) => ticket.flightNum === flightNum
    );

    if (flightIndex !== -1) {
      Object.keys(toUpdate).forEach((key) => {
        if (this.#tickets[flightIndex].hasOwnProperty(key)) {
          this.#tickets[flightIndex][key] = toUpdate[key];
        }
      });
      message = "Flight details updated successfully\n";
    } else {
      message = "Flight not found\n";
    }

    return message;
  }
}

module.exports = { TicketsReservation };
