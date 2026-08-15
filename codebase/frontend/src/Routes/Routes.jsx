import React from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { usePravahListener, usePravahState, usePravahContext } from "pravah-sdk";
import { useMember } from "../context";
import * as Layout from "../Layouts";
import { MilkmanDashboard } from "../pages";
import { api, loadData } from "../utils"

export function Routes() {
    const user = useMember();
    const pravah = usePravahContext();
    const pravahState = usePravahState(pravah, "connected");
    
    usePravahListener(pravah, `login-${pravahState?.pravahId}`, async () => {
        window.location.reload();
    });

    return useRoutes([
        {
            path: "*",
            element: user.loading
                ? <Loading />
                : user.loggedIn
                    ? [undefined, "", null].includes(user?.value?.role)
                        ? <VisitorRoutes user={user} pravah={pravah} />
                        : <MemberRoutes {...{ user, pravah }} />
                    : <VisitorRoutes user={user} pravah={pravah} />
        }
    ]);
}

function MilkmanRoutes({ user, pravah }) {
    const [business, setBusiness] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
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
    return useRoutes([
        {
            path: "/",
            element: isLoading?<>Loading</>:<Layout.Milkman {...{ user, pravah, business }} />,
            children: [
                {
                    path: "dashboard",
                    element: <MilkmanDashboard {...{ user, pravah, business }} />
                },
                {
                    path: "dashboard/*",
                    element: <MilkmanDashboard {...{ user, pravah, business }} />
                },
                {
                    path: "",
                    element: <MilkmanDashboard {...{ user, pravah, business }} />
                }
            ]
        }
    ]);
}

function ConsumerRoutes({ user, pravah }) {
    return <></>;
}

function MemberRoutes({ user, pravah }) {
    switch (user?.value?.role) {
        case "milkman":
            return <MilkmanRoutes {...{ user, pravah }} />;
        case "consumer":
            return <ConsumerRoutes {...{ user, pravah }} />;
        default:
            return <VisitorRoutes user={user} pravah={pravah} />;
    }
}

function VisitorRoutes({ user, pravah }) {
    return useRoutes([
        {
            path: "policy",
            element: <>Policy Page <Outlet /></>,
            children: [
                {
                    path: "privacy",
                    element: <>Privacy Policy</>
                }
            ]
        },
        {
            path: "/",
            element: <Layout.Visitor user={user} pravah={pravah} />
        },
        {
            path: "*",
            element: <Layout.Visitor user={user} pravah={pravah} />
        }
    ]);
}

function Loading() {
    return <>Loading...</>;
}