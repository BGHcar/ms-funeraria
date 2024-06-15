import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/suscripciones", "SuscripcionesController.findAll");
    Route.get("/suscripciones/:id", "SuscripcionesController.findById");
    Route.post("/suscripciones", "SuscripcionesController.create");
    Route.put("/suscripciones/:id", "SuscripcionesController.update");
    Route.delete("/suscripciones/:id", "SuscripcionesController.delete");
    Route.get("/suscripcionescliente/:id", "SuscripcionesController.findByClienteId");
})
