import React from "react";
// import { usePravah, usePravahListener, usePravahState } from "pravah-sdk"

import './App.css'

import { AuthModal, Navbar } from "./components";
import { useConfig, useMember } from "./context";

export default function App() {
    const user = useMember();
    const config = useConfig();
    const showVar = { user, config };
    return (<div className="page-shell">
        <Navbar />
        <pre>{ JSON.stringify(showVar, null, 2) }</pre>
        {/* <AuthModal
        /> */}
    </div>)
}