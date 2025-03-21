import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/clientes", "ClientesController.findAll");
    Route.get("/clientes/:id", "ClientesController.findById");
    Route.post("/clientes", "ClientesController.create");
    Route.put("/clientes/:id", "ClientesController.update");
    Route.delete("/clientes/:id", "ClientesController.delete");
})