const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos
const cors = require("cors");

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
  // useCreateIndex: true,

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Crear servidor
const app = express();

// parse application/json
app.use(express.json());
// sin instalar body-parser, podemos usar las siguientes línea
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    // Revisar si la petición viene de un servidor que esta en la lista en whitelist
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

// Habilitar cors
app.use(cors(corsOptions));

// Rutas de la app
app.use("/", routes());

// carpeta publica
app.use(express.static("uploads"));

// puerto
app.listen(5000);
