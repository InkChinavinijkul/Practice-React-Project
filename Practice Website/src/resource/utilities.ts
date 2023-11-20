import { Dispatch } from "react"

type GenericObject<T> = {
	[key: string]: T
}

export const removeWhiteSpaces = (menuItemName: string): string => {
	return menuItemName.split(" ").join("")
}

export const setLanguage = (isThai: boolean | undefined): void => {
	const lang = isThai ? "th" : "en"
	localStorage.setItem("lang", lang)
}

export const getLanguage = (): "th" | "en" => {
	const lsLang = localStorage.getItem("lang")
	if (lsLang) lsLang
	return "th"
}

export const getKeyByValue = <T>(
	object: GenericObject<T>,
	value: T
): string => {
	const result = Object.keys(object).find((key) => object[key] === value)
	return result ? result : ""
}

export const addToDynamicList = <T>(
	valueToAdd: T,
	listArray: T[],
	setListState: Dispatch<React.SetStateAction<T[]>>
): void => {
	const newAddMachineList = [...listArray]
	newAddMachineList.push(valueToAdd)
	setListState(newAddMachineList)
}

export const removeFromDynamicList = <T>(
	index: number,
	listArray: T[],
	setListState: Dispatch<React.SetStateAction<T[]>>
): void => {
	const newRemoveMachineList = [...listArray]
	newRemoveMachineList.splice(index, 1)
	setListState(newRemoveMachineList)
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
