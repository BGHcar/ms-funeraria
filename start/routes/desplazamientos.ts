import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/desplazamientos", "DesplazamientosController.findAll")
    Route.post("/desplazamientos", "DesplazamientosController.create")
})