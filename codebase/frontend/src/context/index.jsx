import { MemberProvider, useMember } from "./User";
import { ConfigProvider, useConfig } from "./Config";
import { PravahProvider } from "pravah-sdk"
export { useMember, useConfig };

export function Providers({ children }) {
    const options = {
        streams: ['bizbandhan-milkman'],
    }
    return (
        <ConfigProvider>
            <PravahProvider options={
                options
            }>
                <MemberProvider>
                    { children }
                </MemberProvider>
            </PravahProvider>
        </ConfigProvider>
    );
}