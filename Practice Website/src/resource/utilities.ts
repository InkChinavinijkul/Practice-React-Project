export const removeWhiteSpaces = (menuItemName: string): string => {
  return menuItemName.split(" ").join("")
}

export const calculatePercentage = (value: number, total: number): string => {
  return (100 * (value / total)).toFixed(2)
}

export const addSpaceBetweenWordAndNumber = (inputString: string): string => {
  if (!inputString) return ""
  return inputString.replace(/([a-zA-Z])(\d)/, "$1 $2")
}

export const isNaNReturnZero = (value: number): number => {
  return isNaN(value) ? 0 : value
}

// utilities + idk if this works for {[]} if that actually exists
export const checkLS = (key: string) => {
  if (
    !localStorage.getItem(key) ||
    Object.keys(localStorage.getItem(key)!).length === 0 // overthinking?
  ) {
    return false
  }
  return true
}
