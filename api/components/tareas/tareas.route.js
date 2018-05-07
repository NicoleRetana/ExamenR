const express = require('express'),
        router = express.Router(),
        tareas = require('./tareas.api');

router.param('id', (req, res, next, id) => {
    req.body.id = id;
    next();
});

// se definen las rutas
router.route('/registrar_tarea')
    .post((req, res) => {
        tareas.registrar(req, res)
    });

router.route('/tareas')
    .get((req, res) => {
        tareas.retornar(req, res)
    });

    router.route('/actualizar_tarea')
  .put((req, res) => {
    tareas.update(req,res);
});


module.exports = router;