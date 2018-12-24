import {
    ACEPTAR_AMISTAD,
    DENEGAR_AMISTAD,
    INSERT_MSN,
    LOGOUT,
    SOLICITAR_AMISTAD,
    USER_ID,
    USERS_SUCCES,
    UPDATE_STORE
} from "../reducers/users";

/*
    Importamos las constantes que definen las acciones y se comunican con el Reducer

    Definimos las funciones que van a lanzar estas constantes para que los reducers hagan lo que deban hacer.
*/

export const logout = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT
        })
    }
};

export const updateStore = (data) => {
    return dispatch => {
        dispatch({
            type: UPDATE_STORE,
            data
        })
    }
};

export const insertMessage = (data) => {
    return dispatch => {
        dispatch({
            type: INSERT_MSN,
            data
        })
    }
};

export const getUsers = () => {
    return async dispatch => {
        let data = false;
        let url = 'https://randomuser.me/api/?results=8&seed=xyz';
        await fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            data = response.results;
        });

        dispatch({
            type: USERS_SUCCES, data
        })
    }
};

export const setUserId = (data) => {
    return dispatch => {
        dispatch({
            type: USER_ID,
            data
        })
    }
};

export const solicitarAmistad = (data) => {
    return dispatch => {
        dispatch({
            type: SOLICITAR_AMISTAD,
            data
        })
    }
};

export const aceptarAmistad = (data) => {
    return dispatch => {
        dispatch({
            type: ACEPTAR_AMISTAD,
            data
        })
    }
};

export const denegarAmistad = (data) => {
    return dispatch => {
        dispatch({
            type: DENEGAR_AMISTAD,
            data
        })
    }
};
