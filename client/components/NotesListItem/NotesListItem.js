import React from "react";
import Link from "next/link";
import moment from "moment";

function NotesListItem({ note }) {
    const link = "/note/" + note._id;
    return (
        <Link href={link}>
            <div className="notes-list-item shadow">
                <div className="notes-list-item-content">
                    <div className="notes-list-item-title">
                        {note.name === "" ? "Untitled" : note.name}
                    </div>
                    <div className="notes-list-item-description">
                        Create modern react app using apollo
                    </div>
                </div>
                <div className="notes-list-date">
                    {moment(note.updatedAt).fromNow()}
                </div>
            </div>
        </Link>
    );
}

export default NotesListItem;
