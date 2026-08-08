import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Modal } from "../components";
import { api, loadData } from "../utils";

export function Milkman({ user, pravah, business }) {
    const [showBusinessModal, setShowBusinessModal] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    
    function onMyBusiness() {
        setShowBusinessModal(true);
    }
    
    return (<div className="home">
        <Navbar {...{ user, pravah,onMyBusiness }} />
        {showBusinessModal && <Modal.Business {...{ user, pravah, business,onClose: () => setShowBusinessModal(false) }} />}
        <Outlet />
    </div>)
}