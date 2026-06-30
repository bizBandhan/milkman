import {
    ArrowRight,
    ArrowLeft,
    BadgeCheck,
    CalendarRange,
    CheckCircle2,
    Clock3,
    CreditCard,
    Eye,
    KeyRound,
    LogOut,
    MessageCircleMore,
    Milk,
    NotebookTabs,
    Plus,
    ShieldCheck,
    Smartphone,
    Users,
    UserRound,
    WifiOff,
    X,
} from 'lucide-react'

export default function Navbar({ isAuthenticated, onOpenModal }) {
    function openAuthModal() {
        if (onOpenModal) onOpenModal("auth")
    }
    return <header className="topbar">
        <div className="brand">
            <div className="brand-mark">
                <Milk size={ 20 } strokeWidth={ 2.2 } />
            </div>
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
                Open dashboard
            </button>
        ) : (
            <button className="nav-cta" type="button" onClick={ openAuthModal }>
                Sign in
            </button>
        ) }
    </header>
}