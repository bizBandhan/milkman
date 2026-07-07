import React from "react";
import { api, loadData } from "../utils";

const ConfigContext = React.createContext();

export function ConfigProvider({ children }) {
    const [config, setConfig] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [reload, setReload] = React.useState(1);
    React.useState(() => {
        console.log("Loading config")
        loadData(
            api.get(`/api/v1/config`),
            resp => {
                setConfig(resp.data)
            },
            () => { setIsLoading(false) }
        )
    }, [reload])
    return <ConfigContext.Provider value={ {
        value: config,
        loading: isLoading,
        reload: e => { setReload((reload + 1) % 10) }
    } }>
        { children }
    </ConfigContext.Provider>
}

export function useConfig() {
    return React.useContext(ConfigContext)
}