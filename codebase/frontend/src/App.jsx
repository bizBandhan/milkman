import React from "react";
import {
    ArrowRight,
    // ShieldCheck,
    // Clock3,
    CheckCircle2,
    //   ArrowLeft,
    //   BadgeCheck,
    CalendarRange,
    CreditCard,
    //   Eye,
    //   KeyRound,
    //   LogOut,
    //   MessageCircleMore,
    //   Milk,
    //   NotebookTabs,
    //   Plus,
    Smartphone,
    //   Users,
    //   UserRound,
    WifiOff,
    //   X,
} from 'lucide-react'

import { usePravahState, usePravahContext, usePravahListener } from "pravah-sdk"

import './App.css'

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
                {/* <HeroSection/> */ }
                <Hero
                    onSignIn={ () => { setOpenModal("sign-in") } }
                    user={ user }
                />
                <Features />

                <AudianceSection />
            </main>
            <Footer />
            {/* <pre>{ JSON.stringify(showVar, null, 2) }</pre> */ }
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
    //     return  <section className="relative min-h-[90vh] md:min-h-screen flex items-center gradient-bg overflow-hidden py-12 px-6 md:px-16 lg:px-24">
    //     <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/40 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    //     <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

    //     <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
    //       <div className="lg:col-span-6 space-y-6 text-slate-900">
    //         <div className="flex items-center space-x-3">
    //           <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
    //             <span className="text-emerald-600 text-sm">🛡️</span>
    //             <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">SSL Secured</span>
    //           </div>
    //           <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
    //             <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
    //             <span className="text-xs font-bold text-slate-800 tracking-wide">BizBandhan Suite</span>
    //           </div>
    //         </div>
    //         <div className="space-y-3">
    //           <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">BizBandhan Milkman</h2>
    //           <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
    //             Your Reliable Daily <br className="hidden md:inline"/>Supply Partner. Track, Manage, Sync — Instantly.
    //           </h1>
    //         </div>
    //         <p className="text-lg md:text-xl font-medium text-slate-700 border-l-4 border-emerald-500 pl-4 max-w-xl bg-emerald-50/50 py-2 pr-2 rounded-r-lg">
    //           Doodh Ka Hisab, Ab Parivaar Aur Doodhwale Ke Beech Ekdum Saaf.
    //         </p>
    //         <p className="text-sm md:text-base text-slate-600 max-w-lg">
    //           An offline-first delivery ecosystem engineered to sync transparent billing updates seamlessly between local delivery routes and household shared calendars.
    //         </p>
    //         <div className="flex flex-col sm:flex-row gap-4 pt-4">
    //           <a href="#register" className="inline-flex items-center justify-center bg-slate-950 hover:bg-slate-900 text-white font-semibold text-sm px-6 py-4 rounded-xl shadow-md transform active:scale-98 transition text-center">
    //             <div>
    //               <span className="block text-base">Register as Vendor</span>
    //               <span className="block text-xs text-slate-400 font-normal mt-0.5">(Vendor Ke Liye)</span>
    //             </div>
    //           </a>

    //           <a href="#download" className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-semibold text-sm px-6 py-4 rounded-xl shadow-sm transform active:scale-98 transition text-center">
    //             <div>
    //               <span className="block text-base">Download Customer App</span>
    //               <span className="block text-xs text-slate-500 font-normal mt-0.5">(Graahak Ke Liye)</span>
    //             </div>
    //           </a>
    //         </div>
    //       </div>
    //       <div className="lg:col-span-6 relative flex items-center justify-center h-[450px] md:h-[600px] w-full mt-8 lg:mt-0">
    //         <div className="relative z-20 w-[240px] md:w-[280px] h-[480px] md:h-[560px] bg-white rounded-[38px] shadow-2xl border-[7px] border-slate-900 overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
    //           <div className="absolute top-0 inset-x-0 h-5 bg-slate-900 flex justify-center items-center rounded-b-xl z-50">
    //             <div className="w-16 h-3 bg-black rounded-full"></div>
    //           </div>
    //           <div className="p-4 pt-7 space-y-4 bg-slate-50/50 h-full flex flex-col justify-between text-xs">
    //             <div className="flex justify-between items-center">
    //               <div>
    //                 <p className="text-[10px] text-slate-400 font-medium">Location</p>
    //                 <p className="font-bold text-slate-800 flex items-center gap-0.5">📍 Delhi NCR</p>
    //               </div>
    //               <div className="w-7 h-7 bg-blue-100 rounded-full border border-blue-200 overflow-hidden flex items-center justify-center font-bold text-blue-600">
    //                 OM
    //               </div>
    //             </div>
    //             <div className="bg-blue-600 text-white p-3 rounded-xl space-y-1">
    //               <p className="font-bold text-sm">Fresh Milk Delivered!</p>
    //               <p className="text-[10px] opacity-90">Every morning at your doorstep.</p>
    //             </div>
    //             <div className="space-y-2 flex-grow mt-2">
    //               <div className="flex justify-between items-center font-bold text-slate-700">
    //                 <span>Categories</span>
    //                 <span className="text-blue-600 text-[10px]">View all</span>
    //               </div>
    //               <div className="grid grid-cols-2 gap-2">
    //                 <div className="p-2 bg-white rounded-lg border border-slate-100 text-center space-y-1 shadow-sm">
    //                   <div className="h-12 bg-blue-50 rounded flex items-center justify-center text-lg">🥛</div>
    //                   <p className="font-semibold text-slate-700 text-[10px]">Cow Milk</p>
    //                   <span className="bg-slate-100 text-slate-600 px-1 rounded-full text-[9px] font-medium">Add</span>
    //                 </div>
    //                 <div className="p-2 bg-white rounded-lg border border-slate-100 text-center space-y-1 shadow-sm">
    //                   <div className="h-12 bg-emerald-50 rounded flex items-center justify-center text-lg">🍼</div>
    //                   <p className="font-semibold text-slate-700 text-[10px]">Full Cream</p>
    //                   <span className="bg-slate-100 text-slate-600 px-1 rounded-full text-[9px] font-medium">Add</span>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="border-t border-slate-100 pt-2 flex justify-around text-slate-400 text-base">
    //               <span className="text-blue-600">🏠</span>
    //               <span>📅</span>
    //               <span>📊</span>
    //               <span>⚙️</span>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="absolute left-2 md:left-6 top-1/4 z-30 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3 transform -translate-x-4 md:-translate-x-8 animate-bounce transition-all duration-1000" >
    //           <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg font-bold">
    //             🥛
    //           </div>
    //           <div>
    //             <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Daily Orders</p>
    //             <p className="text-base font-bold text-slate-800">8,900+</p>
    //           </div>
    //         </div>
    //         <div className="absolute right-0 top-12 z-30 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 w-44 space-y-2 transform translate-x-4 md:translate-x-8">
    //           <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
    //             <span className="flex items-center gap-1">🚚 Live Route</span>
    //             <span className="text-emerald-500 font-bold animate-pulse">● Active</span>
    //           </div>
    //           <div className="h-16 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200">
    //             <div className="absolute inset-0 bg-emerald-50"></div>
    //             <div className="absolute top-4 left-4 w-28 h-0.5 bg-dashed bg-blue-400 border-t border-dashed"></div>
    //             <span className="absolute top-2 left-2 text-xs">🏠</span>
    //             <span className="absolute bottom-2 right-4 text-xs">📍</span>
    //           </div>
    //         </div>
    //         <div className="absolute right-2 bottom-1/4 z-30 flex flex-col space-y-2 transform translate-x-6 md:translate-x-12">
    //           <div className="bg-white p-2 rounded-xl shadow-md border border-slate-100 flex items-center justify-center text-base hover:scale-110 transition-transform">
    //             📅
    //           </div>
    //           <div className="bg-white p-2 rounded-xl shadow-md border border-slate-100 flex items-center justify-center text-base hover:scale-110 transition-transform">
    //             🪙
    //           </div>
    //         </div>
    //         <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30 bg-white/80 backdrop-blur-md border border-slate-200/60 px-5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3 w-[85%] sm:w-[70%]">
    //           <div className="text-2xl">🛵</div>
    //           <div className="flex-grow">
    //             <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
    //               <div className="h-full w-3/4 bg-emerald-500 rounded-full animate-pulse"></div>
    //             </div>
    //             <p className="text-[10px] text-slate-500 font-medium mt-1">Morning route optimization engine synchronized.</p>
    //           </div>
    //         </div>

    //       </div>

    //     </div>
    //   </section>;
    return <section className="hero-fullwidth">
        {/* Column 1: Text Content Area */ }
        <div className="hero-copy-column">
            <p className="hero-kicker">A simple local milk delivery ledger without operational drag</p>
            <h1>Smart Milk Delivery</h1>
            <p className="hero-text">
                BizBandhan Milkman keeps milk vendors and families in sync with shared delivery records, automatic billing, and WhatsApp-based onboarding—no lengthy registration required.
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

        {/* Column 2: Pure Visual Graphic Area */ }
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
            { featureCards.map((feature) => {
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
            }) }
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