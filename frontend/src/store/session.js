import { csrfFetch } from "./csrf";

//CONSTANTS
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const UPDATE_USER = "session/updateUser";
const CHANGE_ROLE = "session/changeRole";

const GET_PROFILE_PICTURE = "session/getProfilePicture";
const ADD_PROFILE_PICTURE = "session/addProfilePicture";
const CHANGE_PROFILE_PICTURE = "session/changeProfilePicture";
const DELETE_PROFILE_PICTURE = "session/deleteProfilePicture";


//ACTION CREATORS
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    };
}

const getProfilePicture = (userImage) => {
    return {
        type: GET_PROFILE_PICTURE,
        payload: userImage
    };
}

const changeProfilePicture = (userImage) => {
    return {
        type: CHANGE_PROFILE_PICTURE,
        payload: userImage
    };
}

const changeRole = (user) => {
    return {
        type: CHANGE_ROLE,
        payload: user
    };
}

//THUNKS
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: "DELETE"
    });
    dispatch(removeUser());
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username, firstName, lastName, email, password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const updateUserProfile = (user) => async (dispatch) => {
    const { id, username, firstName, lastName, email, profilePicture } = user;
    const response = await csrfFetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id, username, firstName, lastName, email, profilePicture
        })
    });
    const data = await response.json();
    dispatch(updateUser(data.user));
    return response;
}

export const getUserProfilePic = (user) => async (dispatch) => {
    // console.log(user);
    const { id } = user;
    const response = await csrfFetch(`/api/users/${id}/image`);
    const data = await response.json();
    // console.log("THIS IS DATA", data);
    dispatch(getProfilePicture(data.userImage));
    return response;
}

export const changeProfilePic = (user, pictureUrl) => async (dispatch) => {
    const { id } = user;
    const { profilePicture } = pictureUrl;
    const response = await csrfFetch(`/api/users/${id}/image`, {
        method: "PUT",
        body: JSON.stringify({
            id, profilePicture
        })
    });
    const data = await response.json();
    dispatch(changeProfilePicture(data.userImage));
    return response;
}

export const changeUserRole = (user, role) => async (dispatch) => {
    const { id } = user;
    const { roleId } = role;
    const response = await csrfFetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id, role
        })
    });
    const data = await response.json();
    dispatch(changeRole(data.role));
    return response;
}

//REDUCER
const initialState = { user: null, userImage: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        case UPDATE_USER:
            return { ...state, user: action.payload };
        case GET_PROFILE_PICTURE:
            return { ...state, userImage: action.payload };
        case CHANGE_PROFILE_PICTURE:
            return { ...state, userImage: action.payload };
        case CHANGE_ROLE:
        default:
            return state;
    }
};

export default sessionReducer;