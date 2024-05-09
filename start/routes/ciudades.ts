import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/ciudades", "CiudadesController.findAll");
    Route.get("/ciudades/:id", "CiudadesController.findById");
    Route.post("/ciudades", "CiudadesController.create");
    Route.put("/ciudades/:id", "CiudadesController.update");
    Route.delete("/ciudades/:id", "CiudadesController.delete");
})