export const GET_PROFILE = 'phumphwng/profile/LOAD';
export const GET_PROFILE_SUCCESS = 'phumphwng/profile/LOAD_SUCCESS';
export const GET_PROFILE_FAIL = 'phumphwng/profile/LOAD_FAIL';

export const SAVE_PROFILE = 'phumphwng/profile/SAVE';
export const SAVE_PROFILE_SUCCESS = 'phumphwng/profile/SAVE_SUCCESS';
export const SAVE_PROFILE_FAIL = 'phumphwng/profile/SAVE_FAIL';

export const GET_NOTIFICATIONS = 'phumphwng/noti/LOAD';
export const GET_NOTIFICATIONS_SUCCESS = 'phumphwng/noti/LOAD_SUCCESS';
export const GET_NOTIFICATIONS_FAIL = 'phumphwng/noti/LOAD_FAIL';

export const RESET = 'phumphwng/reset';

export const RESET_BADGE_COUNT = 'phumphwng/badge/RESET';
export const ADD_BADGE_COUNT = 'phumphwng/badge/ADD';

const INITIAL_STATE = {
    profile: {},
    badgeCount: 0,
    seenNotification: {},
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {...state, loading: true};
        case GET_PROFILE_SUCCESS:
            return {...state, loading: false, profile: action.payload.data};
        case GET_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching data'
            };
        case SAVE_PROFILE:
            return {...state, loading: true};
        case SAVE_PROFILE_SUCCESS:
            return {...state, loading: false, profile: action.payload.data};
        case SAVE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching data'
            };
        case GET_NOTIFICATIONS:
            return {...state, loading: true};
        case GET_NOTIFICATIONS_SUCCESS:
            return {...state, loading: false, notifications: action.payload.data};
        case GET_NOTIFICATIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching data'
            };
        case RESET:
            return INITIAL_STATE;
        case RESET_BADGE_COUNT:
            let newNotifications = [];
            if (state.notifications !== undefined) {
                for (let n of state.notifications) {
                    n.seen = 1;
                    newNotifications.push(n)
                }
            }
            return {...state, notifications: newNotifications};
        default:
            return state;
    }
}

export function resetBadgeCount(accessToken) {
    return {
        type: RESET_BADGE_COUNT,
        payload: {
            request: {
                method: 'POST',
                url: `/user/notificationSeen`,
                headers: {
                    "content-type": "application/json",
                    'authorization': `bearer ${accessToken}`,
                    'cache-control': 'no-cache',
                },
            }
        }
    };
}

export function reset() {
    return {
        type: RESET,
        payload: {}
    };
}

export function getProfile(accessToken) {
    return {
        type: GET_PROFILE,
        payload: {
            request: {
                url: `/user/show`,
                headers: {
                    'authorization': `bearer ${accessToken}`,
                    'cache-control': 'no-cache',
                }
            }
        }
    };
}

export function getNotifications(accessToken) {
    return {
        type: GET_NOTIFICATIONS,
        payload: {
            request: {
                url: `/user/notifications`,
                headers: {
                    'authorization': `bearer ${accessToken}`,
                    'cache-control': 'no-cache',
                }
            }
        }
    };
}


export function saveProfile(profile, accessToken) {
    return {
        type: SAVE_PROFILE,
        payload: {
            request: {
                method: 'POST',
                url: `/user/update`,
                headers: {
                    "content-type": "application/json",
                    'authorization': `bearer ${accessToken}`,
                    'cache-control': 'no-cache',
                },
                data: profile
            }
        }
    };
}
