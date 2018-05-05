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

module.exports = router;