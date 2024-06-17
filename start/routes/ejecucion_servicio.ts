import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/ejecucionservicios", "EjecucionServiciosController.findAll");
    Route.get("/ejecucionservicios/:id", "EjecucionServiciosController.findById");
    Route.post("/ejecucionservicios", "EjecucionServiciosController.create");
    Route.put("/ejecucionservicios/:id", "EjecucionServiciosController.update");
    Route.delete("/ejecucionservicios/:id", "EjecucionServiciosController.delete");
    Route.get("/ejecuciontitular/:id", "EjecucionServiciosController.findAllByTitular");

})