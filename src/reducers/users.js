export const USERS_SUCCES = 'users/USERS_SUCCES';
export const USER_ID = 'users/USER_ID';
export const INSERT_MSN = 'users/INSERT_MSN';
export const SOLICITAR_AMISTAD = 'users/SOLICITAR_AMISTAD';
export const ACEPTAR_AMISTAD = 'users/ACEPTAR_AMISTAD';
export const UPDATE_STORE = 'UPDATE_STORE';
export const LOGOUT = 'users/LOGOUT';
export const DENEGAR_AMISTAD = 'users/DENEGAR_AMISTAD';

const initialState = {
  logged: false,
  username: null,
  password: null,
  userId: null,
  users: null,
  errorUsers: false,
  mensajes: [],
  amigos: [],
  solicitudes: [],
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
      // Actualiza cualquier estado del store que le pasemos en el action
    case UPDATE_STORE: {
        return Object.assign({}, state, action.data);
    }

    // Guardamos la información cuando recibimos el GET de users
    case USERS_SUCCES:
      return {
        ...state,
        users: action.data,
        errorUsers: !action.data,
        isFetching: !state.isFetching
      };

      // Guardamos el id del usuario logeado
    case USER_ID:
      localStorage.removeItem('userId');
      localStorage.setItem('userId', action.data);
      return {
        ...state,
        userId: action.data
      };

      // Insertamos un nuevo mensaje y lo guardamos en localStorage y en store
    case INSERT_MSN:
        if (!localStorage.getItem('mensajes')) {
            let data = [];
            data.push({
                [action.data.id]: [action.data.msg]
            });
            localStorage.setItem('mensajes', JSON.stringify(data));
        } else {
            var mensajesAnteriores = JSON.parse(localStorage.getItem('mensajes'));
            let exist = mensajesAnteriores.find(elem => elem[action.data.id]);
            if (exist) {
                let index = mensajesAnteriores.findIndex(ele => ele[action.data.id]);
                mensajesAnteriores[index][action.data.id].push(action.data.msg);
            } else {
                mensajesAnteriores.push({
                    [action.data.id]:[action.data.msg]
                });
            }
            localStorage.removeItem('mensajes');
            localStorage.setItem('mensajes', JSON.stringify(mensajesAnteriores));
        }
      return {
        ...state,
        mensajes: mensajesAnteriores
      };

        //Si denegamos una amistad, gestionamos las solicitudes pendientes y las globales para eliminarlas
      case DENEGAR_AMISTAD:
          // Borrar de mis solicitudes pendientes
          let solicitudesAMiRestantes = JSON.parse(localStorage.getItem('solicitudesAMi'));
          let inde = solicitudesAMiRestantes.findIndex(elem => elem.a === action.data.a && elem.de === action.data.de);
          solicitudesAMiRestantes.splice(inde, 1);
          localStorage.removeItem('solicitudesAMi');
          localStorage.setItem('solicitudesAMi', JSON.stringify(solicitudesAMiRestantes));
          // ElIMINAR DE SOLICITUDES PENDIENTES GLOBALES
          let solicitudesGlobalesRestantes = JSON.parse(localStorage.getItem('solicitudes'));
          let indexx = solicitudesGlobalesRestantes.findIndex(elem => elem.a === action.data.a && elem.de === action.data.de);
          solicitudesGlobalesRestantes.splice(indexx, 1);
          localStorage.removeItem('solicitudes');
          localStorage.setItem('solicitudes', JSON.stringify(solicitudesGlobalesRestantes));
          return {
              ...state,
              solicitudes: solicitudesGlobalesRestantes
          };

          //Solicitamos una amistad y la añadimos al localsTORAGE donde se guardan las globales
    case SOLICITAR_AMISTAD:
        if (!localStorage.getItem('solicitudes')) {
            let data = [];
            data.push(action.data);
            localStorage.setItem('solicitudes', JSON.stringify(data));
        } else {
            var solicitudesAnteriores = JSON.parse(localStorage.getItem('solicitudes'));
            solicitudesAnteriores.push(action.data);
            localStorage.removeItem('solicitudes');
            localStorage.setItem('solicitudes', JSON.stringify(solicitudesAnteriores));
        }
      return {
        ...state,
        solicitudes: solicitudesAnteriores
      };
    // Aceptamos la amistad, así que se quita de las solicitudes propias, de las globales y se guarda el amigo
      case ACEPTAR_AMISTAD:
          // GUARDAR LAS SOLICITUDES RESTANTES Y BORRAR LA QUE ACABO DE ACEPTAR
        let solicitudesAMi = JSON.parse(localStorage.getItem('solicitudesAMi'));
        let ind = solicitudesAMi.findIndex(elem => elem.a === action.data.a && elem.de === action.data.de);
        solicitudesAMi.splice(ind, 1);
        localStorage.removeItem('solicitudesAMi');
        localStorage.setItem('solicitudesAMi', JSON.stringify(solicitudesAMi));
        // GUARDAR NUEVO AMIGO ACEPTADO COMO MI AMIGO
          if (!localStorage.getItem('amigos')) {
              let data = [];
              data.push({
                  [action.data.a]:[action.data]
              });
              data.push({
                  [action.data.de]:[action.data]
              });
              localStorage.setItem('amigos', JSON.stringify(data));
          } else {
              var amigosAnteriores = JSON.parse(localStorage.getItem('amigos'));
              let existeA = amigosAnteriores.findIndex(elem => elem[action.data.a]);
              let existeDe = amigosAnteriores.findIndex(elem => elem[action.data.de]);
              if (existeA !== -1) {
                  amigosAnteriores[existeA][action.data.a].push(action.data);
                  if (existeDe !== -1) {
                      amigosAnteriores[existeDe][action.data.de].push(action.data);
                  } else {
                      amigosAnteriores.push({
                          [action.data.de]:[action.data]
                      });
                  }
              } else if (existeDe !== -1) {
                  amigosAnteriores[existeDe][action.data.de].push(action.data);
                  amigosAnteriores.push({
                      [action.data.a]:[action.data]
                  });
              } else {
                  amigosAnteriores.push({
                      [action.data.a]:[action.data]
                  });
                  amigosAnteriores.push({
                      [action.data.de]:[action.data]
                  });
              }

              localStorage.removeItem('amigos');
              localStorage.setItem('amigos', JSON.stringify(amigosAnteriores));
          }
      let amigos = amigosAnteriores;
            // ElIMINAR DE SOLICITUDES PENDIENTES GLOBALES
           let solicitudesGlobales = JSON.parse(localStorage.getItem('solicitudes'));
           let index = solicitudesGlobales.findIndex(elem => elem.a === action.data.a && elem.de === action.data.de);
           solicitudesGlobales.splice(index, 1);
           localStorage.removeItem('solicitudes');
           localStorage.setItem('solicitudes', JSON.stringify(solicitudesGlobales));
      return {
        ...state,
        amigos
      };

    // Cerramos sesión y borramos el userId guardado en localStorage, además de setear el store de logged a false
    case LOGOUT:
       localStorage.removeItem('userId');
      return {
          ...state,
          logged: false
      };

    default:
      return state
  }
};
