import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/conductores", "ConductoresController.findAll");
    Route.get("/conductores/:id", "ConductoresController.findById");
    Route.post("/conductores", "ConductoresController.create");
    Route.put("/conductores/:id", "ConductoresController.update");
    Route.delete("/conductores/:id", "ConductoresController.delete");
})