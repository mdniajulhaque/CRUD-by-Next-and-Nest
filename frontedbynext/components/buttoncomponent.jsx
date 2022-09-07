import React from "react";

function Button(props){

    return <button className={props.classname}
    type="button"  onClick={props.onClick}>
    
    {props.bname}
    </button>
}
export default Button;
