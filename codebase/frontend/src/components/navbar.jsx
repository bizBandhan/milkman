import { navigateTo } from "../utils";

export default function Navbar({ isAuthenticated, onSignIn }) {
    function signIn() {
        if (onSignIn) onSignIn("auth")
    }
    return <header className="topbar">
        <div className="brand">
            <img src={ "/logo.png" } alt={ "BizBandhan Milkman" } height={ 50 } />
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

        { isAuthenticated ? (
            <button className="nav-cta" type="button" onClick={ () => navigateTo('/dashboard') }>
                My Account
            </button>
        ) : (
            <button className="nav-cta" type="button" onClick={ signIn }>
                Sign in
            </button>
        ) }
    </header>
}