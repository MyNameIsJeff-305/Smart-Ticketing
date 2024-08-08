import { csrfFetch } from "./csrf";

//CONSTANTS
const GET_TICKETS = "tickets/getTickets";
const GET_USER_TICKETS = "tickets/getUserTickets";
const GET_TICKET_DETAILS = "tickets/getTicketDetails";
const CREATE_TICKET = "tickets/createTicket";
const UPDATE_TICKET = "tickets/updateTicket";
const DELETE_TICKET = "tickets/deleteTicket";
const ADD_PART = "tickets/addPart";
const ADD_TAG = "tickets/addTag";
const REMOVE_PART = "tickets/removePart";
const REMOVE_TAG = "tickets/removeTag";

//ACTION CREATORS
const getTickets = (tickets) => {
    return {
        type: GET_TICKETS,
        payload: tickets
    };
}

const getUserTickets = (tickets) => {
    return {
        type: GET_USER_TICKETS,
        payload: tickets
    };
}

const getTicketDetails = (ticket) => {
    return {
        type: GET_TICKET_DETAILS,
        payload: ticket
    };
}

const createTicket = (ticket) => {
    return {
        type: CREATE_TICKET,
        payload: ticket
    };
}

const updateTicket = (ticket) => {
    return {
        type: UPDATE_TICKET,
        payload: ticket
    };
}

const deleteTicket = (ticketId) => {
    return {
        type: DELETE_TICKET,
        payload: ticketId
    };
}

const addPart = (part) => {
    return {
        type: ADD_PART,
        payload: part
    };
}

const addTag = (tag) => {
    return {
        type: ADD_TAG,
        payload: tag
    };
}

const removePart = (part) => {
    return {
        type: REMOVE_PART,
        payload: part
    };
}

const removeTag = (tag) => {
    return {
        type: REMOVE_TAG,
        payload: tag
    };
}

//THUNKS
export const getTicketsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/tickets");

    if (response.ok) {
        const tickets = await response.json();
        dispatch(getTickets(tickets));
    }
}

export const getUserTicketsThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tickets/${userId}`);

    if (response.ok) {
        const tickets = await response.json();
        dispatch(getUserTickets(tickets));
    }
}

export const getTicketDetailsThunk = (ticketId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tickets/${ticketId}`);

    if (response.ok) {
        const ticket = await response.json();
        dispatch(getTicketDetails(ticket));
    }
}

export const createTicketThunk = (ticket) => async (dispatch) => {
    const response = await csrfFetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify(ticket)
    });

    if (response.ok) {
        const newTicket = await response.json();
        dispatch(createTicket(newTicket));
        return newTicket;
    }
}

export const updateTicketThunk = (ticket) => async (dispatch) => {
    const response = await csrfFetch(`/api/tickets/${ticket.id}`, {
        method: "PUT",
        body: JSON.stringify(ticket)
    });

    if (response.ok) {
        const updatedTicket = await response.json();
        dispatch(updateTicket(updatedTicket));
        return updatedTicket;
    }
}

export const deleteTicketThunk = (ticketId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tickets/${ticketId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteTicket(ticketId));
    }
}

export const addPartThunk = (ticketId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tickets/${ticketId}/parts`, {
        method: "POST",
        body: JSON.stringify(part)
    });

    if (response.ok) {
        const newPart = await response.json();
        dispatch(addPart(newPart));
        return newPart;
    }
}

export const addTagThunk = (ticketId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tickets/${ticketId}/tags`, {
        method: "POST",
        body: JSON.stringify(tag)
    });

    if (response.ok) {
        const newTag = await response.json();
        dispatch(addTag(newTag));
        return newTag;
    }
}

export const removePartThunk = (partId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tickets/parts/${partId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removePart(partId));
    }
}

export const removeTagThunk = (tagId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tickets/tags/${tagId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removeTag(tagId));
    }
}

//REDUCER
const initialState = {
    allTickets: [],
    byId: {}
}

const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TICKETS: {
            const allTickets = action.payload;
            const newAllTickets = [];
            const newById = {};
            allTickets.forEach(ticket => {
                newAllTickets.push(ticket);
                newById[ticket.id] = ticket;
            });
            return {
                ...state,
                allTickets: newAllTickets,
                byId: newById
            }
        }
        case GET_USER_TICKETS: {
            const userTickets = action.payload;
            const newUserTickets = [];
            const newUserById = {};
            userTickets.forEach(ticket => {
                newUserTickets.push(ticket);
                newUserById[ticket.id] = ticket;
            });
            return {
                ...state,
                allTickets: newUserTickets,
                byId: newUserById
            }
        }
        case GET_TICKET_DETAILS: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                }
            }
        }
        case CREATE_TICKET: {
            return {
                ...state,
                allTickets: [...state.allTickets, action.payload.id],
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                }
            }
        }
        case UPDATE_TICKET: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                }
            }
        }
        case DELETE_TICKET: {
            newState = { ...state };

            const filteredTickets = newState.allTickets.filter((ticket) => {
                return ticket.id !== action.payload.id
            });
            newState.allTickets = filteredTickets;

            const newById = { ...newState.byId };
            delete newById[action.payload.id];
            newState.byId = newById;

            return newState;
        }
        case ADD_PART: {
            const ticket = state.byId[action.payload.ticketId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.ticketId]: {
                        ...ticket,
                        parts: [...ticket.parts, action.payload]
                    }
                }
            }
        }
        case ADD_TAG: {
            const ticket = state.byId[action.payload.ticketId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.ticketId]: {
                        ...ticket,
                        tags: [...ticket.tags, action.payload]
                    }
                }
            }
        }
        case REMOVE_PART: {
            const ticket = state.byId[action.payload.ticketId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.ticketId]: {
                        ...ticket,
                        parts: ticket.parts.filter(part => part.id !== action.payload.id)
                    }
                }
            }
        }
        case REMOVE_TAG: {
            const ticket = state.byId[action.payload.ticketId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.ticketId]: {
                        ...ticket,
                        tags: ticket.tags.filter(tag => tag.id !== action.payload.id)
                    }
                }
            }
        }
        default:
            return state;
    }
}

export default ticketsReducer;