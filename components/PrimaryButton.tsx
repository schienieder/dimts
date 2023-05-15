import React from 'react'

interface PrimaryButtonProps {
    btnText: string;
    onClickButton(): any;
}

const PrimaryButton = ({ btnText, onClickButton }: PrimaryButtonProps) => {
    return (
        <button 
            type="button" 
            className={`bg-purple-600 hover:bg-purple-500 w-72 px-3 py-2 text-white font-semibold rounded-lg transition-colors ease-out duration-200`}
            onClick={ onClickButton }
        >{ btnText }</button>
    )
}

export default PrimaryButton