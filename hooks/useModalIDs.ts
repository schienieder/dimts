import { useState } from 'react'

const useModalIDs = () => {
    const [selectedID, setSelectedID] = useState(0);
    const [selectedObject, setSelectedObject] = useState<any>({
        hearingID: 0,
        hearingSchedule : "",
        hearingStartTime : "",
        hearingEndTime : "",
        hearingCaseNo : ""
    })
    const [successText, setSuccessText] = useState("")

    return {
        selectedID,
        setSelectedID,
        selectedObject,
        setSelectedObject,
        successText,
        setSuccessText
    }
}

export default useModalIDs