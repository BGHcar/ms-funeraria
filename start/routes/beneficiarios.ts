import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/beneficiarios", "BeneficiariosController.findAll");
    Route.get("/beneficiarios/:id", "BeneficiariosController.findById");
    Route.post("/beneficiarios", "BeneficiariosController.create");
    Route.put("/beneficiarios/:id", "BeneficiariosController.update");
    Route.delete("/beneficiarios/:id", "BeneficiariosController.delete");
    Route.get("/beneficiariostitular/:id", "BeneficiariosController.findAllByTitular");
})