import React from "react";
import Link from "next/link";

function BackButton(props) {
    return (
        <Link href={props.href}>
            <div onClick={props.onClick} className="back-button">
                {props.icon}
            </div>
        </Link>
    );
}

export default BackButton;
