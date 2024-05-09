import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/serviciosxplanes", "ServiciosxplanesController.findAll");
    Route.get("/serviciosxplanes/:id", "ServiciosxplanesController.findById");
    Route.post("/serviciosxplanes", "ServiciosxplanesController.create");
    Route.put("/serviciosxplanes/:id", "ServiciosxplanesController.update");
    Route.delete("/serviciosxplanes/:id", "ServiciosxplanesController.delete");
})