import className from "classnames"

function Buttons ({
    children , 
    standard ,
    primary , 
    secondary ,
    success , 
    warning ,
    danger ,
    rounded ,
    hover,
    ...rest
}) {

 const classes = className(rest.className , "  flex m-2 px-3 py-1.5 transition-all duration-300 ease-in-out text-lg " ,
    {
        "bg-stone-800  text-gray-500 " : secondary && !hover,
        "bg-blue-400  text-blue-900" : primary && !hover ,
        "bg-yellow-500  text-black" : warning && !hover ,
        "bg-transparent  text-white" : danger && !hover,
        "bg-green-500  text-white" : success && !hover,
        "rounded-full" : rounded ,
        " bg-stone-800  text-gray-500 hover:px-4  hover:py-2.5 hover:text-gray-300 ease-in-out " : secondary && hover,
        " bg-blue-400 border-blue-300 text-blue-900 hover:text-blue-200 hover:px-5 hover:py-2.5  ease-in-out " : primary && hover,
        " bg-yellow-500 border-yellow-400 text-black hover:text-yellow-900 hover:px-4 hover:py-2.5   ease-in-out " : warning && hover,
        "bg-transparent  hover:bg-red-800 border-2 border-red-300 text-red-500 hover:text-black hover:px-4 hover:py-2.5 ease-in-out " : danger && hover,
        "bg-green-500 border-green-400 hover: text-white hover:px-4 hover:py-2.5    ease-in-out " : success && hover,



        
    }
   )
return <div>
<button {...rest} className={classes}>{children}</button>
</div>
    
}

export default Buttons










