import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/traslados", "TrasladosController.findAll");
    Route.get("/traslados/:id", "TrasladosController.findById");
    Route.post("/traslados", "TrasladosController.create");
    Route.put("/traslados/:id", "TrasladosController.update");
    Route.delete("/traslados/:id", "TrasladosController.delete");
})