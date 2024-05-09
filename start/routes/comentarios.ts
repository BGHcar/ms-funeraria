import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/comentarios","ComentariosController.create");
    Route.get("/comentarios/:id","ComentariosController.findById");
    Route.get("/comentarios","ComentariosController.findAll");
    Route.get("/comentariosServicio/:id","ComentariosController.findByServicioId");
    Route.put("/comentarios/:id","ComentariosController.update");
    Route.delete("/comentarios/:id","ComentariosController.delete");

})