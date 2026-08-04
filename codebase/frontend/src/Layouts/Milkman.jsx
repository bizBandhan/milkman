import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Modal } from "../components";
import { api, loadData } from "../utils";

export function Milkman({ user, pravah }) {
    const [showBusinessModal, setShowBusinessModal] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [business, setBusiness] = React.useState(null);

    React.useEffect(() => {
        setIsLoading(true);
        loadData(
            api.get("/api/v1/seller"),
            resp => {
                ("data" in resp)
                    ? setBusiness(resp?.data?.pop())
                    : null
            },
            () => { setIsLoading(false) }
        );
    }, [user, pravah]);
    function onMyBusiness() {
        setShowBusinessModal(true);
    }
    
    return (<div className="home">
        <Navbar {...{ user, pravah,onMyBusiness }} />
        {showBusinessModal && <Modal.Business {...{ user, pravah, business,onClose: () => setShowBusinessModal(false) }} />}
        <Outlet />
    </div>)
}