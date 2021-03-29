import React from 'react';

function NodeListAdd(props) {
    return (
        <div className="notes-list-item node-list-item-add d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center flex-column">
                <div className="add-icon-container mb-3">
                    <div className="node-list-item-add-icon text-center">
                        <i className="fas fa-sticky-note"></i>
                    </div>
                </div>
                <p className="text-center">Create new note</p>
            </div>
        </div>
    );
}

export default NodeListAdd;