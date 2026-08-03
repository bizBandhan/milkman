import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Modal } from "../components";
import { api, loadData } from "../utils";

export function Milkman({ user, pravah }) {
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
    // return <pre>{JSON.stringify({ business }, null, 2)}</pre>
    return (<div className="home">
        <Navbar {...{ user, pravah }} />
        <Modal.Business {...{ user, pravah, business }} />
        <Outlet />
    </div>)
}