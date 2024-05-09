import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/salas", "SalasController.findAll");
    Route.get("/salas/:id", "SalasController.findById");
    Route.post("/salas", "SalasController.create");
    Route.put("/salas/:id", "SalasController.update");
    Route.delete("/salas/:id", "SalasController.delete");
})