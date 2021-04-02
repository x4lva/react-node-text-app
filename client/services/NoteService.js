import axios from "axios";

export const createNode = (userId) => {
    console.log(userId);
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
    console.log(noteId);
    return axios
        .post("http://localhost:5000/note/data", { noteId })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            console.log(e);
        });
};
