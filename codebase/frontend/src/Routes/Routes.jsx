import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useMember } from "../context";
import * as Layout from "../Layouts";
import { usePravahListener, usePravahState, usePravahContext } from "pravah-sdk";
export function Routes() {
    const user = useMember();
    const pravah = usePravahContext();
    const pravahState = usePravahState(pravah, "connected");

    usePravahListener(pravah, `login-${pravahState?.pravahId}`, async () => {
        window.location.reload()
    })
    console.log({ pravahState, user })
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
    ])
}
function MilkmanRoutes({ user, pravah }) {
    return useRoutes([
        {
            path:"/",
            element: <Layout.Milkman user={user} pravah={pravah} />,
            children: [
                {
                    path: "/dashboard",
                    element: <>Milkman Dashboard <Outlet /></>
                }
            ]
        }
    ])
}
function ConsumerRoutes({ user, pravah }) {
    return <></>
}
function MemberRoutes({ user, pravah }) {
    switch (user?.value?.role) {
        case "milkman":
            return <MilkmanRoutes {...{ user, pravah }} />
        case "consumer":
            return <ConsumerRoutes {...{ user, pravah }} />
        default:
            return <VisitorRoutes user={user} pravah={pravah} />
    }
}
function VisitorRoutes({ user, pravah }) {
    return useRoutes([
        {
            path: "/",
            element: <Layout.Visitor user={user} pravah={pravah} />,
            children: [
                {
                    path: "/policy",
                    element: <>Policy Page <Outlet /></>,
                    children: [
                        {
                            path: "/policy/privacy",
                            element: <>Privacy Policy</>
                        }
                    ]
                }
            ]
        },
        {
            path: "*",
            element: <Navigate to="/" />
        }
    ])
}
function Loading() {
    return <>Loading</>
}