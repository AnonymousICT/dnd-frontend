import React, { useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import Button from "@material-ui/core/Button";

export default function User() {
    return (
        <div>
            <b>For Developers and Apps:</b>
            <p>Session Token: </p><br />
            <code>{localStorage.getItem("x-auth-token")}</code>
        </div>
    );
}