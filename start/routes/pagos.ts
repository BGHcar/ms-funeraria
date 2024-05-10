import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/pagos", "PagosController.findAll");
    Route.get("/pagos/:id", "PagosController.findById");
    Route.post("/pagos", "PagosController.create");
    Route.put("/pagos/:id", "PagosController.update");
    Route.delete("/pagos/:id", "PagosController.delete");
})
