const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productoController = require("../controllers/productoController");
const pedidosController = require("../controllers/pedidosController");
const usuarioController = require("../controllers/usuarioController");

// middle para proteger las rutas
const auth = require("../middleware/auth");

module.exports = function () {
  // Agrega clientes via POST
  router.post("/clientes", auth, clienteController.nuevoCliente);

  // Obtener todos los clientes
  router.get("/clientes", auth, clienteController.mostrarClientes);

  // Muestra un cliente en especifico (ID)
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);

  // Actualizar Cliente
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);

  // Eliminar cliente
  router.delete(
    "/clientes/:idCliente",
    auth,
    clienteController.eliminarCliente
  );

  /** PRODUCTOS */
  // nuevos productos
  router.post(
    "/productos",
    productoController.subirArchivo,
    productoController.nuevoProducto
  );

  // Muestra todos los productos
  router.get("/productos", auth, productoController.mostrarProductos);

  // muestra un producto especifico por su ID
  router.get(
    "/productos/:idProducto",
    auth,
    productoController.mostrarProducto
  );

  // Actualizar Productos
  router.put(
    "/productos/:idProducto",
    auth,
    productoController.subirArchivo,
    productoController.actualizarProducto
  );

  // Eliminar Productos
  router.delete(
    "/productos/:idProducto",
    auth,
    productoController.eliminarProducto
  );

  // Busqueda de Productos
  router.post(
    "/productos/busqueda/:query",
    auth,
    productoController.buscarProducto
  );

  /** PEDIDOS */
  // Agrega nuevos pedidos
  router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);

  // mostrar todos los pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);

  // Mostrar un  pedido por su ID
  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);

  // Actualizar pedidos
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);

  // Elimina un pedido
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  // Usuarios
  router.post("/crear-cuenta", auth, usuarioController.registrarUsuario);
  router.post("/iniciar-sesion", usuarioController.autenticarUsuario);

  return router;
};
