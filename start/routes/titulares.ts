import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/titulares", "TitularesController.findAll");
    Route.get("/titulares/:id", "TitularesController.findById");
    Route.post("/titulares", "TitularesController.create");
    Route.put("/titulares/:id", "TitularesController.update");
    Route.delete("/titulares/:id", "TitularesController.delete");
    Route.get("/titularesemail/:email", "TitularesController.findByEmail");
})