import React from "react";
import {
    ArrowRight,
    CheckCircle2,
    CalendarRange,
    Smartphone,
    CreditCard,
    WifiOff,
} from 'lucide-react'

import { usePravahState, usePravahContext, usePravahListener } from "pravah-sdk"

// import './App.css'

import { Navbar, Modal, Footer } from "./components";
import { useConfig, useMember } from "./context";

export default function App() {
    const [pravah, user, config] = [usePravahContext(), useMember(), useConfig()]
    const pravahState = usePravahState(pravah, "connected")
    const [openModal, setOpenModal] = React.useState(null);
    const showVar = { user, config };
    usePravahListener(pravah, `login-${pravahState?.pravahId}`, async () => {
        window.location.reload()
    })
    React.useEffect(() => {
        if (user.loading) return;
        if (user.loggedIn === false) return;
        if ([null, "", undefined].includes(user.value.name)) {
            // avoid synchronous setState inside effect to prevent cascading renders
            const t = setTimeout(() => setOpenModal("sign-up"), 0)
            return () => clearTimeout(t)
        }
    }, [user.loading, user.loggedIn, user.value?.name])
    return user.loading
        ? <Loading /> :
        <div className="page-shell">
            <Navbar
                isAuthenticated={ user.loggedIn }
                onSignIn={ () => { setOpenModal("sign-in") } }
            />
            <main>
                <Hero
                    onSignIn={ () => { setOpenModal("sign-in") } }
                    user={ user }
                />
                <Features />
                <AudianceSection />
            </main>
            <pre>{ JSON.stringify(showVar, null, 2) }</pre>
            <Footer />
            {
                (openModal === "sign-in")
                && <Modal.Auth
                    whatsappNumber={ `+${config?.value?.["whatsapp-no"]}` }
                    onClose={ () => { setOpenModal(null) } }
                    pravahState={ pravahState }
                />
            }
            {
                (openModal === "sign-up")
                && <Modal.Register
                    user={ user.value }
                />
            }
        </div>
}
function Loading() {
    return <>Loading...</>
}
function Hero({ onSignIn, user }) {

    return <section className="hero-fullwidth">
        <div className="hero-copy-column">
            <p className="hero-kicker">A simple local milk delivery ledger without operational drag</p>
            <h1>Smart Milk Delivery</h1>
            <p className="hero-text">
                BizBandhan Milkman keeps milk vendors and families in sync with shared delivery records, automatic billing, and WhatsApp-based onboarding, no lengthy registration required.
            </p>

            {
                !user?.loading
                && !user?.loggedIn
                && <div className="hero-actions">
                    <button className="button button-primary" type="button" onClick={ () => { if (onSignIn) onSignIn() } }>
                        Get started
                        <ArrowRight size={ 18 } />
                    </button>
                </div>
            }

            <ul className="hero-notes" aria-label="Product highlights">
                <li>
                    <CheckCircle2 size={ 16 } />
                    WhatsApp led onboarding
                </li>
                <li>
                    <CheckCircle2 size={ 16 } />
                    Offline delivery marking with sync recovery
                </li>
                <li>
                    <CheckCircle2 size={ 16 } />
                    Household pause and leave controls
                </li>
            </ul>
        </div>
        <div className="hero-image-column">
            <img src={ "/images/banner-002.png" } alt="BizBandhan Milkman Visual" />
        </div>
    </section>
}
function Features() {

    const featureCards = [
        {
            icon: Smartphone,
            title: 'Single-hand delivery flow',
            description:
                'A fast swipe-sheet for milkmen to mark deliveries on the route without slowing down at each home.',
        },
        {
            icon: WifiOff,
            title: 'Offline first by design',
            description:
                'Queue delivery updates locally and sync later, so poor connectivity does not break the morning run.',
        },
        {
            icon: CalendarRange,
            title: 'Shared family calendar',
            description:
                'Households can view upcoming deliveries, pause dates, and leave clear instructions without back-and-forth calls.',
        },
        {
            icon: CreditCard,
            title: 'Simple payment records',
            description:
                'Track manual and UPI collections with lightweight statements that reduce ledger disputes.',
        },
    ]
    return <section className="feature-section" id="features">
        <div className="section-heading">
            <p className="eyebrow">Core capabilities</p>
            <h2>Designed around the real friction points of daily milk delivery.</h2>
        </div>

        <div className="feature-grid">
            {
                featureCards.map(
                    (feature) => {
                        const Icon = feature.icon
                        return (
                            <article className="feature-card" key={ feature.title }>
                                <div className="feature-icon">
                                    <Icon size={ 20 } />
                                </div>
                                <h3>{ feature.title }</h3>
                                <p>{ feature.description }</p>
                            </article>
                        )
                    }
                )
            }
        </div>
    </section>
}

function AudianceSection() {
    return <section className="audience-section" id="audience">
        <article className="audience-card">
            <p className="eyebrow">For milk vendors</p>
            <h3>Replace fragmented diaries, chats, and memory-based delivery tracking.</h3>
            <p>
                Manage clients, subscriptions, daily routes, and collection records without switching between
                paper notes and messaging threads.
            </p>
        </article>

        <article className="audience-card accent-card">
            <p className="eyebrow">For households</p>
            <h3>Give families a clear calendar instead of repeated calls and confusion.</h3>
            <p>
                View deliveries, pause dates, and payment history in a shared interface built for family-level
                visibility.
            </p>
        </article>
    </section>
}