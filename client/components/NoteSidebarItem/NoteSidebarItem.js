import React from "react";
import Link from "next/link";
import moment from "moment";
function NoteSidebarItem({ active, note }) {
    let className = "note-sidebar-item d-flex flex-column p-3";

    if (active === true) {
        className += " active-note";
    }

    const link = `/note/${note._id}`;
    const text = note.data[0].children[0].text;

    return (
        <div className={className}>
            <Link href={link}>
                <div>
                    <div className="note-sidebar-item-header text-light">
                        {note.name === "" ? "Untitled" : note.name}
                    </div>
                    <div className="note-sidebar-item-description text-secondary">
                        {text}
                    </div>
                    <div className="note-sidebar-item-date text-light ">
                        {moment(note.updatedAt).fromNow()}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default NoteSidebarItem;
