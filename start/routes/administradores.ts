import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/administradores", "AdministradoresController.findAll");
    Route.get("/administradores/:id", "AdministradoresController.findById");
    Route.post("/administradores", "AdministradoresController.create");
    Route.put("/administradores/:id", "AdministradoresController.update");
    Route.delete("/administradores/:id", "AdministradoresController.delete");
})