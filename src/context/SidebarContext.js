import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();
function SidebarProvider(props) {
    const [isVisible, setIsVisible] = useState(false)
    const value = {isVisible, setIsVisible}
    return <SidebarContext.Provider {...props} value={value}></SidebarContext.Provider>
}

function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === 'undefined') {
        throw new Error('useSidebar must be used in SidebarProvider')
    }
    return context
}

export {SidebarProvider, useSidebar} 