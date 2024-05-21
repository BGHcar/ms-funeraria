import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import "./routes/administradores";
import "./routes/beneficiarios";
import "./routes/clientes";
import "./routes/conductores";
import "./routes/titulares";
import "./routes/usuarios";
import "./routes/departamentos";
import "./routes/ciudades";
import "./routes/sedes";
import "./routes/salas";
import "./routes/comentarios";
import "./routes/chats";
import "./routes/mensajes";
import "./routes/servicios";
import "./routes/traslados";
import "./routes/sepulturas";
import "./routes/cremaciones";
import "./routes/ejecucion_servicio";
import "./routes/planes";
import "./routes/serviciosxplanes";
import "./routes/pagos";
import "./routes/suscripciones";
import "./routes/feretros";
import "./routes/desplazamientos";

