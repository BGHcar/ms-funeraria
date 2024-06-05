import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
    console.log('nuevo dispositivo conectado')
    let id = socket.id
    const { body } = socket.handshake.query;
    console.log('se conectó'+id)
    
    socket.emit('news', { hello: 'world' })

    //   socket.on('my other event', (data) => {
    //     console.log(data)
    //   })
})
