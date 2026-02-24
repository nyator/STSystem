
export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage(key) {
    const item = localStorage.getItem(key)
    if (!item) return null
    try {
        return JSON.parse(item)
    } catch (e) {
        // If stored value is not valid JSON, return the raw string as a fallback
        return item
    }
}