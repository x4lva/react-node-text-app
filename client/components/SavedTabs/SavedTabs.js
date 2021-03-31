import React from "react";
import { useEffect } from "react";

function SavedTabs(props) {
    useEffect(() => {
        const triggerTabList = [].slice.call(
            document.querySelectorAll("#pills-tab button")
        );
        triggerTabList.forEach(function (triggerEl) {
            const tabTrigger = new bootstrap.Tab(triggerEl);

            triggerEl.addEventListener("click", function (event) {
                event.preventDefault();
                tabTrigger.show();
            });
        });
    }, []);

    return (
        <div className="h-100">
            <ul
                className="nav nav-pills mb-3 gap-4"
                id="pills-tab"
                role="tablist"
            >
                <li className="nav-item" role="presentation">
                    <button
                        className="notes-tabs-item active"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                    >
                        Images
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="notes-tabs-item"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                    >
                        Documents
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="notes-tabs-item"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                    >
                        Text
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="notes-tabs-item"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-sites"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                    >
                        Sites
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <div className="tab-empty d-flex flex-column justify-content-center align-items-center">
                        <div className="tab-empty-icon">
                            <i className="fas fa-image"></i>
                        </div>
                        <div className="tab-empty-text text-center">
                            Keep photos, checks <br /> and records in one place.
                        </div>
                    </div>
                </div>
                <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                >
                    2
                </div>
                <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                >
                    3
                </div>
                <div
                    className="tab-pane fade"
                    id="pills-sites"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                >
                    4
                </div>
            </div>
        </div>
    );
}

export default SavedTabs;
