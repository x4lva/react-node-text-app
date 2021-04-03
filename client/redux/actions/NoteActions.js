import { UPDATE_NOTE_STATE } from "../types/NoteTypes";
import { createNode } from "../../services/NoteService";
import { getSession } from "next-auth/client";
import Router from "next/router";
import firebase from "../../utils/Firebase";

export const updateNoteState = (payload) => {
    return {
        type: UPDATE_NOTE_STATE,
        payload,
    };
};

export const createNodeAction = () => async (dispatch, getState) => {
    const session = await getSession();

    const db = firebase.database().ref("notes");

    const newNoteRef = db.push({
        name: "",
        data: [
            {
                date: new Date().toUTCString(),
                text: [
                    {
                        type: "paragraph",
                        children: [{ text: "" }],
                    },
                ],
            },
        ],
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
        author: session.id,
        deleted: false,
        public: false,
        published: false,
    });

    await Router.push("/note/" + newNoteRef.key);
};

export const setNoteData = (note) => (dispatch, getState) => {
    dispatch(
        updateNoteState({
            noteData: { ...note },
        })
    );
};
