import React, { useState, useEffect } from "react"

type useDebounceParams = {
    textValue: string;
}

const useDebounce = ({ textValue }: useDebounceParams) => {
    const [debounceValue, setDebounceValue] = useState<string>(textValue)

    useEffect(() => {
        const debounceTimeOut: any = setTimeout(() => {
            setDebounceValue(textValue)
        }, 500)
        return () => {
            clearTimeout(debounceTimeOut)
        }
    }, [textValue])

    return debounceValue

}

export default useDebounce