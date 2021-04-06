import { UPDATE_NOTE_STATE } from "../types/NoteTypes";
import { createNode } from "../../services/NoteService";
import { getSession } from "next-auth/client";
import Router from "next/router";

export const updateNoteState = (payload) => {
    return {
        type: UPDATE_NOTE_STATE,
        payload,
    };
};

export const createNodeAction = () => async (dispatch, getState) => {
    const session = await getSession();

    createNode(session.id).then((res) => {
        dispatch(
            updateNoteState({
                noteData: { ...res },
            })
        );
        Router.push("/note/" + res._id);
    });
};

export const setNoteData = (note) => (dispatch, getState) => {
    dispatch(
        updateNoteState({
            noteData: { ...note },
        })
    );
};
