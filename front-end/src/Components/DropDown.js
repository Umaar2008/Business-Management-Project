import { useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go"

function DropDown ({options , value , onChange}) {

    const [ isOpen , setIsOpen ] = useState(false )
   

    const handleClick =  ( ) => {
        setIsOpen(!isOpen)
    }
    const handleOptionClick = (option) => {

        setIsOpen(false)

        onChange(option) 
    }

  
    const renderdOptions = options.map((option) => {
        return <div className=" border hover:bg-sky-100 rounded cursor-pointer p-1"  key={option.value} onClick={() => handleOptionClick (option)}> {option.label} </div>
    })

   
    return <div>
        <div className="w-48  relative">
    <div className="flex border-2  border-black p-2  justify-between items-center cursor-pointer" 
     onClick={handleClick}> 
      {value?.label || 'select...'}
      <GoChevronDown className="text-lg" /> 

    </div>
    
   { isOpen &&  <div className=" rounded flex flex-col text-sm  overflow-y-scroll h-item justify-center w-48   "> {renderdOptions}  </div>}

     </div>
    </div>
}
export default DropDown;