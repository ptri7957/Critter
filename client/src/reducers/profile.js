import { CREATE_PROFILE, CREATE_PROFILE_ERROR, CLEAR_PROFILE, GET_USER_PROFILE, GET_USER_PROFILE_ERROR, GET_PROFILE_BY_ID, GET_ALL_PROFILES } from '../actions/types';

const initialState = {
    yourProfile: null,
    profile: null,
    profiles: [],
    loading: true
}

export default function(state=initialState, action){
    switch (action.type) {
        case GET_USER_PROFILE:
        case CREATE_PROFILE:
            return {
                ...state,
                yourProfile: action.payload,
                profile: null,
                loading: false
            }
        case GET_PROFILE_BY_ID:
            return {
                ...state,
                profile: action.payload,
                yourProfile: null,
                loading: false
            }
        case GET_ALL_PROFILES:
            return {
                ...state,
                profile: null,
                yourProfile: null,
                profiles: action.payload,
                loading: false
            }
        case CLEAR_PROFILE:
        case GET_USER_PROFILE_ERROR:
        case CREATE_PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                yourProfile: null,
                profiles: [],
                loading: false
            }
        default:
            return state;
    }
}