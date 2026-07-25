import React, { createContext, useContext } from "react"
import { api, loadData } from "../utils";

const MemberContext = createContext();
export function MemberProvider({ children }) {
    const [me, setMe] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true);
    const [reload, setReload] = React.useState(1);
    React.useEffect(() => {
        loadData(
            api.get(`/api/v1/me`),
            resp => {
                let data = resp?.data;
                if (data instanceof Array) {
                    data = null
                }
                setMe(data)
            },
            () => { setIsLoading(false) }
        )
    }, [reload])
    return <MemberContext.Provider value={
        {
            value: me,
            loading: isLoading,
            reload: async () => {
                setIsLoading(true);
                try {
                    let resp = await api.get(`/api/v1/me`);
                    let data = resp?.data;
                    if (data instanceof Array) {
                        data = null
                    }
                    setMe(data)

                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false)
                }
            },
            logout: async () => {
                setIsLoading(true);
                loadData(
                    api.delete(`/api/v1/me`),
                    () => {
                        setReload(old => (old + 1) % 10);
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