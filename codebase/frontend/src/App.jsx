import React from "react";
import { usePravahState, usePravahContext, usePravahListener } from "pravah-sdk"

import './App.css'

import { AuthModal, Navbar } from "./components";
import { useConfig, useMember } from "./context";

export default function App() {
    const [pravah, user, config] = [usePravahContext(), useMember(), useConfig()]
    const pravahState = usePravahState(pravah, "connected")
    const [isAuthPopupOpen, openAuthPopup] = React.useState(false);
    const showVar = { user, config };
    usePravahListener(pravah, `login-${pravahState?.pravahId}`, (event) => {
        console.log(event)
    })
    return (<div className="page-shell">
        <Navbar onOpenModal={ () => { openAuthPopup(true) } } />
        <pre>{ JSON.stringify(showVar, null, 2) }</pre>
        {
            isAuthPopupOpen
            && <AuthModal
                pravahState={ pravahState }
                authStep="code"
                whatsappNumber={ `+${config?.value?.["whatsapp-no"]}` }
                authCode={ "dsalkfjkldsa" }
                onClose={ () => { openAuthPopup(false) } }
            />
        }
    </div>)
}