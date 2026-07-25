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
    console.log({pravahState,user})
    return useRoutes([
        {
            path: "*",
            element: user.loading
                ? <Loading />
                : user.loggedIn
                    ? [undefined, "", null].includes(user?.value?.role)
                        ? <VisitorRoutes user={user} pravah={pravah} />
                        : <MemberRoutes user={ user } />
                    : <VisitorRoutes user={user} pravah={pravah} />
        }
    ])
}
function MemberRoutes({ user }) {
    return <pre>{ JSON.stringify(user, null, 2) }</pre>
}
function VisitorRoutes({user,pravah}) {
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