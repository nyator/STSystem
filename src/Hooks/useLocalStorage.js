
export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage(key) {
    const item = localStorage.getItem(key)
    if (!item === null) return null
    try {
        return JSON.parse(item)
    } catch (e) {
        return item
    }
}