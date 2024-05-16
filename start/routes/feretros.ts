import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/feretros", "FeretrosController.findAll");
    Route.post("/feretros", "FeretrosController.create");
})