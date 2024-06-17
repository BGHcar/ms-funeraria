import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/cremaciones", "CremacionesController.findAll");
    Route.get("/cremaciones/:id", "CremacionesController.findById");
    Route.post("/cremaciones", "CremacionesController.create");
    Route.put("/cremaciones/:id", "CremacionesController.update");
    Route.delete("/cremaciones/:id", "CremacionesController.delete");
    Route.get("/serviciocremaciones/:id", "CremacionesController.findAllByServicio");

})