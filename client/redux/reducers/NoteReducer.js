import { UPDATE_NOTE_STATE } from "../types/NoteTypes";

const initialState = {
    noteData: {
        _id: "",
        name: "",
        deleted: false,
        published: false,
        public: false,
        data: [
            {
                date: {},
                text: [
                    {
                        type: "paragraph",
                        children: [{ text: "" }],
                    },
                ],
            },
        ],
        author: "",
    },
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NOTE_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default noteReducer;
