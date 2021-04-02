import { UPDATE_USER_STATE } from "../types/UserTypes";

export const updateUserState = (payload) => {
    return {
        type: UPDATE_USER_STATE,
        payload,
    };
};

export const setUserNotes = (notes) => (dispatch, getState) => {
    dispatch(
        updateUserState({
            userNotes: notes,
        })
    );
};
