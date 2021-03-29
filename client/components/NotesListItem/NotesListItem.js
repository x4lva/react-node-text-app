import React from 'react';

function NotesListItem(props) {
    return (
        <div className="notes-list-item shadow">
            <div className="notes-list-item-content">
                <div className="notes-list-item-title">
                    Project plan
                </div>
                <div className="notes-list-item-description">
                    Create modern react app using apollo
                </div>
            </div>
            <div className="notes-list-date">
                19 minutes ago
            </div>
        </div>
    );
}

export default NotesListItem;