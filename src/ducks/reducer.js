import axios from "axios";

const initialState = {
    username: '',
    password: '',
    confirmPass: '',
    firstName: '',
    lastName: '',
    email: '',
    loginUsername: '',
    loginPassword: '',
    profilePicture: '',
    video1: {},
    video2: {}
}



const CHANGE_USERNAME = 'CHANGE_USERNAME';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const CHANGE_CONFIRMED_PASSWORD = 'CHANGE_CONFIRMED_PASSWORD';
const CHANGE_FIRST_NAME = 'CHANGE_FIRST_NAME';
const CHANGE_LAST_NAME = 'CHANGE_LAST_NAME';
const CHANGE_EMAIL = 'CHANGE_EMAIL';
const CHANGE_LOGIN_USERNAME = 'CHANGE_LOGIN_USERNAME'
const CHANGE_LOGIN_PASSWORD = 'CHANGE_LOGIN_PASSWORD'
const CHANGE_PROFILE_PICTURE = 'CHANGE_PROFILE_PICTURE'
const CHANGE_VIDEO_1 = 'CHANGE_VIDEO_1';
const CHANGE_VIDEO_2 = 'CHANGE_VIDEO_2';


export function changeVideo1(video) {
    return {
        type: CHANGE_VIDEO_1,
        payload: video
    }
}
export function changeVideo2(video) {
    return {
        type: CHANGE_VIDEO_2,
        payload: video
    }
}
export function changeProfilePicture(change) {
    return {
        type: CHANGE_PROFILE_PICTURE,
        payload: change
    }
}
export function changeLoginUsername(change) {
    return {
        type: CHANGE_LOGIN_USERNAME,
        payload: change
    }
}
export function changeLoginPassword(change) {
    return {
        type: CHANGE_LOGIN_PASSWORD,
        payload: change
    }
}
export function changeUsername(change) {
    return {
        type: CHANGE_USERNAME,
        payload: change
    }
}
export function changePassword(change) {
    return {
        type: CHANGE_PASSWORD,
        payload: change
    }
}
export function changeConfirmedPassword(change) {
    return {
        type: CHANGE_CONFIRMED_PASSWORD,
        payload: change
    }
}
export function changeFirstName(change) {
    return {
        type: CHANGE_FIRST_NAME,
        payload: change
    }
}
export function changeLastName(change) {
    return {
        type: CHANGE_LAST_NAME,
        payload: change
    }
}
export function changeEmail(change) {
    return {
        type: CHANGE_EMAIL,
        payload: change
    }
}



export default function reducer(state=initialState, action) {
    switch(action.type) {
        case CHANGE_VIDEO_1:
        return {
            ...state,
            video1: action.payload
        }
        case CHANGE_VIDEO_2:
        return {
            ...state,
            video2: action.payload
        }
        case CHANGE_PROFILE_PICTURE:
        return {
            ...state,
            profilePicture: action.payload
        }
        case CHANGE_USERNAME:
        return {
            ...state,
            username: action.payload
        }
        case CHANGE_PASSWORD:
        return {
            ...state,
            password: action.payload
        }
        case CHANGE_CONFIRMED_PASSWORD:
        return {
            ...state,
            confirmPass: action.payload
        }
        case CHANGE_FIRST_NAME:
        return {
            ...state,
            firstName: action.payload
        }
        case CHANGE_LAST_NAME:
        return {
            ...state,
            lastName: action.payload
        }
        case CHANGE_EMAIL:
        return {
            ...state,
            email: action.payload
        }
        case CHANGE_LOGIN_USERNAME:
        return {
            ...state,
            loginUsername: action.payload
        }
        case CHANGE_LOGIN_PASSWORD:
        return {
            ...state,
            loginPassword: action.payload
        }
        default: return state
    }
}