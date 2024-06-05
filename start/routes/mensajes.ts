import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/mensajes", "MensajesController.findAll");
    Route.get("/mensajes-chat/:id", "MensajesController.findByChatId");
    Route.get("/mensajes/:id", "MensajesController.findById");
    Route.post("/mensajes", "MensajesController.create");
    Route.put("/mensajes/:id", "MensajesController.update");
    Route.delete("/mensajes/:id", "MensajesController.delete");
})