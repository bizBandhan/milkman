import React from "react";
import { usePravahContext, usePravahState, usePravahListener } from "pravah-sdk";
import {
    GroupRounded,
    AssignmentRounded,
    CurrencyRupeeRounded,
    BarChartRounded,
    LocalShippingRounded,
    FamilyRestroomRounded,
    AllInclusiveRounded,
    WhatsApp
} from "@mui/icons-material";
import { useConfig } from "../context";
import { Modal, Navbar } from "../components";
import "./visitor.css";

export function Visitor({pravah,user}) {
    const [config] = [useConfig()];
    const [activeModal, setActiveModal] = React.useState(null)
    const pravahState = usePravahState(pravah, "connected");
    
    return (<div className="home">
        <Navbar
            onSignIn={ () => { setActiveModal("sign-in") } }
        />
        <div className="page-body">
            <Features />
            <Hero />
        </div>
        <USP />
        {
            user.loggedIn
            ?<Modal.Register/>
            :(activeModal === "sign-in")
            && 
            <Modal.Auth
                whatsappNumber={ config?.value?.["whatsapp-no"] }
                pravahState={ pravahState }
                onClose={ () => { setActiveModal(null) } }
            />
        }
    </div>)
}
function Hero() {
    return <div className="hero">
        <h1>Smart Milk Records</h1>
        <p>A simple local milk delivery ledger without operational drag</p>
        <button className="button button-primary" type="button" >Get Started</button>
    </div>
}
function USP() {
    const usp = [
        {
            heading: "100% free",
            icon: <AllInclusiveRounded />,
            info: "No Hidden Charges"
        },
        {
            heading: "WhatsApp Login",
            icon: <WhatsApp />,
            info: "No username password to remember"
        },
        {
            heading: "UPI Payments",
            icon: <CurrencyRupeeRounded />,
            info: "Secure payment using UPI"
        }
    ];
    return <ul className="usp">
        {
            usp.map(feature => <li key={ feature.heading }>
                <div className="icon">{ feature.icon }</div>
                <strong>{ feature.heading }</strong>
            </li>)
        }
    </ul>
}
function Features() {
    const features = [
        {
            label: "Customer Management",
            icon: <GroupRounded />
        },
        {
            label: "Order Management",
            icon: <AssignmentRounded />
        },
        {
            label: "Payment Collection",
            icon: <CurrencyRupeeRounded />
        },
        {
            label: "Reports and Analytics",
            icon: <BarChartRounded />
        },
        {
            label: "Delivery Tracking",
            icon: <LocalShippingRounded />
        },
        {
            label: "Household Collaboration",
            icon: <FamilyRestroomRounded />
        }
    ];
    return <ul className="features">{ features.map(feature => <li key={ feature.label }>
        <div className="icon">
            { feature.icon }
        </div>
        { feature.label }
    </li>) }
    </ul>
}