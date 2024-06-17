import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/chats", "ChatsController.findAll");
    Route.get("/chats/:id", "ChatsController.findById");
    Route.post("/chats", "ChatsController.create");
    Route.delete("/chats/:id", "ChatsController.delete");
    Route.put("/chats/:id", "ChatsController.update");
})