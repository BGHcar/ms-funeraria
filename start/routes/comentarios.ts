import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/comentarios","ComentariosController.store");
    Route.get("/comentarios/:id","ComentariosController.findById");
    Route.put("/comentarios/:id","ComentariosController.update");
    Route.delete("/comentarios/:id","ComentariosController.delete");
    Route.get("/comentarios","ComentariosController.findAll");
    
})