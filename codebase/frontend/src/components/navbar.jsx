import React from "react";
import { navigateTo } from "../utils";

export default function Navbar({ onSignIn, user, pravah, onMyBusiness }) {
    const isAuthenticated = user?.loggedIn && [undefined, "", null].includes(user?.value?.role) === false;
    function signIn() {
        if (onSignIn) onSignIn("auth")
    }
    return <header className="topbar">
        <div className="brand">
            <img src={"/logo.png"} alt={"BizBandhan Milkman"} height={50} />
            <div>
                <p className="eyebrow">BizBandhan</p>
                <p className="brand-name">Milkman</p>
            </div>
        </div>

        <nav className="topnav" aria-label="Primary">
            <a href="#features">Features</a>
            <a href="#workflow">Workflow</a>
            <a href="#audience">Who it serves</a>
        </nav>

        {isAuthenticated ? (
            <UserMenu user={user} pravah={pravah} onMyBusiness={onMyBusiness} />
        ) : (
            <button className="nav-cta" type="button" onClick={signIn}>
                Sign in
            </button>
        )}
    </header>
}
function UserMenu({ user, pravah, onMyBusiness }) {
    const [showMenu, setShowMenu] = React.useState(false);
    return <div className="user-menu"
        tabIndex={0}
        onBlur={
            (e) => {
                if (e.currentTarget.contains(e.relatedTarget)) return;
                setShowMenu(false)
            }}
    >
        <button
            className="nav-cta"
            type="button"
            onClick={() => { setShowMenu(!showMenu) }}
        >
            <i className="fa-solid fa-user" />
            <span className="user-name">{user?.value?.name}</span>
        </button>
        {
            showMenu
            && <ul className="user-menu-dropdown">
                <li>
                    <button type="button" onClick={() => { navigateTo("/dashboard") }}>
                        Dashboard
                    </button>
                </li>
                <li><button type="button" onClick={() => {
                    console.log(onMyBusiness)
                    onMyBusiness()
                }}>
                    My Business
                </button></li>
                <li>
                    <button type="button" onClick={() => { user.logout() }}>
                        Sign out
                    </button>
                </li>
            </ul>
        }
    </div>
}