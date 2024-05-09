import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/sepulturas", "SepulturasController.findAll");
    Route.get("/sepulturas/:id", "SepulturasController.findById");
    Route.post("/sepulturas", "SepulturasController.create");
    Route.put("/sepulturas/:id", "SepulturasController.update");
    Route.delete("/sepulturas/:id", "SepulturasController.delete");
})