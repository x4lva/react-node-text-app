import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNodeAction } from "../../redux/actions/NoteActions";

function NodeListAdd(props) {
    const dispatch = useDispatch();

    const toggleModal = useCallback(() => {
        dispatch(createNodeAction());
    }, []);

    return (
        <div
            onClick={toggleModal}
            className="notes-list-item node-list-item-add d-flex justify-content-center align-items-center"
        >
            <div className="d-flex justify-content-center flex-column">
                <div className="add-icon-container mb-3">
                    <div className="node-list-item-add-icon text-center">
                        <i className="fas fa-sticky-note" />
                    </div>
                </div>
                <p className="text-center">Create new note</p>
            </div>
        </div>
    );
}

export default NodeListAdd;
