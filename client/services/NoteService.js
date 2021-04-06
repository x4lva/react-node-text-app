import axios from "axios";

export const createNode = (userId) => {
    return axios
        .post("http://localhost:5000/note/create", { userId })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getNotes = (userId) => {
    return axios
        .post("http://localhost:5000/note/list", { userId })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getNoteData = (noteId) => {
    return axios
        .post("http://localhost:5000/note/data", { noteId })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            console.log(e);
        });
};

export const updateNoteText = (noteId, noteText) => {
    return axios
        .post("http://localhost:5000/note/update/text", { noteId, noteText })
        .then((res) => {
            return res;
        })
        .catch((e) => {
            console.log(e);
        });
};

export const updateNoteData = (noteId, noteData) => {
    return axios
        .post("http://localhost:5000/note/update", {
            noteId,
            noteData,
        })
        .then((res) => {
            return res;
        })
        .catch((e) => {
            console.log(e);
        });
};
