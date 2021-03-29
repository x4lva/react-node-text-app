import React from 'react';

function SectionWrapper(props) {
    return (
        <div style={props.style} className="app-section">
            <div className="section-header">
                {props.title}
            </div>
            <div className="section-content">
                {props.children}
            </div>
        </div>
    );
}

export default SectionWrapper;