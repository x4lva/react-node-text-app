import React from "react";
import NotesListItem from "../NotesListItem/NotesListItem";
import NodeListAdd from "../NodeListAdd/NodeListAdd";
import { useSelector } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

function NotesList() {
    const { userNotes } = useSelector((store) => store.userState);

    return (
        <div className="notes-list d-flex gap-3">
            <ScrollContainer
                ignoreElements=""
                hideScrollbars={false}
                horizontal={true}
                vertical={false}
                className="scroll-container d-flex gap-3"
            >
                {userNotes.map((el) => {
                    return <NotesListItem key={el._id} note={el} />;
                })}
                <NodeListAdd />
            </ScrollContainer>
        </div>
    );
}

export default NotesList;
