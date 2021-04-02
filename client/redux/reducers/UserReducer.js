import { UPDATE_USER_STATE } from "../types/UserTypes";

const initialState = {
    userData: {
        _id: "",
        name: "",
        email: "",
        password: "",
    },
    userConnectBoardId: "",
    userToken: null,
    userNotes: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default userReducer;
