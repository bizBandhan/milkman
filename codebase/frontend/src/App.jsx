import React from "react";
import { usePravahState, usePravahContext, usePravahListener } from "pravah-sdk"

import './App.css'

import { Navbar, Modal } from "./components";
import { useConfig, useMember } from "./context";

export default function App() {
    const [pravah, user, config] = [usePravahContext(), useMember(), useConfig()]
    const pravahState = usePravahState(pravah, "connected")
    const [isAuthPopupOpen, openAuthPopup] = React.useState(false);
    const showVar = { user, config };
    usePravahListener(pravah, `login-${pravahState?.pravahId}`, async () => {
        window.location.reload()
    })
    return (<div className="page-shell">
        <Navbar
            isAuthenticated={ user.loggedIn }
            onSignIn={ () => { openAuthPopup(true) } }
        />
        <pre>{ JSON.stringify(showVar, null, 2) }</pre>
        {
            
            !(user.loading)
                && user.loggedIn
                ? (<>
                    <Modal.Register
                        user={ user.value }
                    />
                </>)
                : (isAuthPopupOpen
                    && <Modal.Auth
                        pravahState={ pravahState }
                        authStep="code"
                        whatsappNumber={ `+${config?.value?.["whatsapp-no"]}` }
                        authCode={ "dsalkfjkldsa" }
                        onClose={ () => { openAuthPopup(false) } }
                    />)

        }
    </div>)
}