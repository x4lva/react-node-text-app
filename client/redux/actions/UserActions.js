import { UPDATE_USER_STATE } from "../types/UserTypes";
import { getNotes, updateNoteText } from "../../services/NoteService";

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

export const updateUserNote = (noteId, noteData) => (dispatch, getState) => {
    const result = getState().userState.userNotes.map((el) => {
        if (el._id === noteId) {
            return { ...el, ...noteData };
        }
        return el;
    });

    console.log(result);

    dispatch(
        updateUserState({
            userNotes: result,
        })
    );
};
