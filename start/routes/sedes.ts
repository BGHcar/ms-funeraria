import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/sedes", "SedesController.findAll");
    Route.get("/sedes/:id", "SedesController.findById");
    Route.post("/sedes", "SedesController.create");
    Route.put("/sedes/:id", "SedesController.update");
    Route.delete("/sedes/:id", "SedesController.delete");
})