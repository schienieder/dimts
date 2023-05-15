import React from 'react'

interface SecondayButtonProps {
    btnText: string;
    onClickButton(): any;
}

const SecondayButton = ({ btnText, onClickButton }: SecondayButtonProps) => {
    return (
        <button 
            type="button" 
            className={`bg-gray-100 hover:bg-gray-200 w-72 px-3 py-2 text-purple-600 hover:text-purple-500 font-semibold rounded-lg transition-colors ease-out duration-200`}
            onClick={ onClickButton }
        >{ btnText }</button>
    )
}

export default SecondayButton