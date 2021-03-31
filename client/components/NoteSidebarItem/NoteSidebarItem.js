import React from "react";

function NoteSidebarItem(props) {
    let className = "note-sidebar-item d-flex flex-column p-3";

    if (props.active === true) {
        className += " active-note";
    }

    return (
        <div className={className}>
            <div className="note-sidebar-item-header text-light">
                Project plan
            </div>
            <div className="note-sidebar-item-description text-secondary">
                Create modern react app using apollo
            </div>
            <div className="note-sidebar-item-date text-light ">
                19 minutes ago
            </div>
        </div>
    );
}

export default NoteSidebarItem;
