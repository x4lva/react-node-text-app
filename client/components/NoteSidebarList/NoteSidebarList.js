import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NoteSidebarItem from "../NoteSidebarItem/NoteSidebarItem";
import { useRouter } from "next/router";
import moment from "moment";

function NoteSidebarList(props) {
    let { userNotes } = useSelector((store) => store.userState);
    const router = useRouter();

    userNotes = userNotes.sort(
        (a, b) => moment(b.updatedAt) - moment(a.updatedAt)
    );
    return (
        <div>
            {userNotes.map((el) => {
                return (
                    <NoteSidebarItem
                        active={el._id === router.query.id}
                        note={el}
                    />
                );
            })}
        </div>
    );
}

export default NoteSidebarList;
