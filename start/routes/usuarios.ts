import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/usuarios", "UsuariosController.login");
    Route.put("/usuarios", "UsuariosController.secondAuth");
})