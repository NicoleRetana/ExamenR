const express = require('express'),
        router = express.Router(),
        empleados = require('./empleados.api');

router.param('id', (req, res, next, id) => {
    req.body.id = id;
    next();
});

// se definen las rutas
router.route('/registrar_empleado')
    .post((req, res) => {
        empleados.registrar(req, res)
    });

router.route('/retornar_empleados')
    .get((req, res) => {
        empleados.retornar(req, res)
    });

    router.route('/actualizar_empleado')
  .put((req, res) => {
    empleados.update(req,res);
});
router.route('/buscar_empleado_id')
  .post(function (req, res) {
    empleados.buscar_empleado_por_codigo(req, res);
  });

router.route('/agregar_tarea_empleado')
  .post(function (req, res) {
    empleados.agregar_tarea_empleado(req, res);
  });

module.exports = router;