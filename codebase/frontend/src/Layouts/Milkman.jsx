import React from "react";
import { Navbar } from "../components";

export function Milkman({ user, pravah }) {
    return (<div className="home">
        <Navbar {...{ user, pravah }} />
    </div>)
}