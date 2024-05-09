import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/departamentos", "DepartamentosController.findAll");
    Route.get("/departamentos/:id", "DepartamentosController.findById");
    Route.post("/departamentos", "DepartamentosController.create");
    Route.put("/departamentos/:id", "DepartamentosController.update");
    Route.delete("/departamentos/:id", "DepartamentosController.delete");
})