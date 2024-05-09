import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import axios from 'axios'

export default class UsuariosController {
  public async login({request, response }: HttpContextContract) {
    try {

      let body = request.body()
      // Hacer una solicitud POST a la API de Adonis
      const adonisResponse = await axios.post('http://localhost:8181/api/public/security/login', {email: body.email, password: body.password})

      // Devolver la respuesta de Adonis
      response.status(adonisResponse.status).send(adonisResponse.data)
    } catch (error) {
      // Manejar errores
      console.error('Error al consumir la API de Adonis:', error)
      response.status(error.response?.status || 500).send('Error al consumir la API de Adonis')
    }
  }

  public async secondAuth({request, response }: HttpContextContract) {
    try {
      let body = request.body()
      // Hacer una solicitud POST a la API de Adonis
      const adonisResponse = await axios.put('http://localhost:8181/api/public/security/secondauth', {token: body.token, id : body.id})

      // Devolver la respuesta de Adonis
      response.status(adonisResponse.status).send(adonisResponse.data)
    } catch (error) {
      // Manejar errores
      console.error('Error al consumir la API de Adonis:', error)
      response.status(error.response?.status || 500).send('Error al consumir la API de Adonis')
    }
  }

  // Crear un nuevo usuario

  public async create({ request }: HttpContextContract) {
    let body = request.body()
    const theUsuario = await Usuario.create(body)
    return theUsuario
}

// Obtener todos los usuarios 

public async findAll({request}: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let usuario:Usuario[] = await Usuario.query().paginate(page, perPage)
    return usuario
}

// Obtener un usuario por id

public async findById({ params }: HttpContextContract) {
    const theUsuario = await Usuario.findOrFail(params.id)
    return theUsuario
}

// Actualizar un usuario por id

public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theUsuario = await Usuario.findOrFail(params.id)
    theUsuario.email = body.email
    theUsuario.password = body.password
    return theUsuario.save()

}

// Eliminar un usuario por id

public async delete({ params }: HttpContextContract) {
    const theUsuario = await Usuario.findOrFail(params.id)
    return theUsuario.delete()
}


}
