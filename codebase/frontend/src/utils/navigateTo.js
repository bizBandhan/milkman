
export function navigateTo(pathname) {
    window.history.pushState({}, '', pathname)
    window.location.pathname = pathname
}