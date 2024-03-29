const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      //emitir al cliente conectado todas las bandas actuales
      socket.emit("current-bands", this.bandList.getBands());

      //votar por la banda
      socket.on("votar-banda", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      //borrar banda
      socket.on("borrar-banda", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      //cambiar nombre
      socket.on("cambiar-nombre-banda", ({ id, nombre }) => {
        this.bandList.changeName(id, nombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      //p agregar banda
      socket.on("agregar-banda", ({ nombre }) => {
        this.bandList.addBand(nombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
