import React from "react";


export default function User() {
    return (
        <div>
            <b>For Developers and Apps:</b>
            <p>Session Token: </p><br />
            <code>{localStorage.getItem("x-auth-token")}</code>
        </div>
    );
}