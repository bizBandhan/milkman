import React, { createContext, useContext } from "react"
import { api, loadData } from "../utils";

const MemberContext = createContext();
export function MemberProvider({ children }) {
    const [me, setMe] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true);
    const [reload, setReload] = React.useState(1);
    React.useEffect(() => {
        setIsLoading(true);
        loadData(
            api.get(`/api/v1/me`),
            resp => {
                setMe(resp.data)
            },
            () => { setIsLoading(false) }
        )
    }, [reload])
    return <MemberContext.Provider value={
        {
            value: me,
            loading: isLoading,
            reload: (e) => {
                setReload((reload + 1) % 10)
            },
            logout: async () => {
                setIsLoading(true);
                loadData(
                    api.delete(`/api/v1/me`),
                    resp => {
                        setReload((reload + 1) % 10);
                    },
                    () => { setIsLoading(false) }
                )
            },
            loggedIn: Boolean(me)
        }
    }>{ children }</MemberContext.Provider>
}


export function useMember() {
    return useContext(MemberContext);
}