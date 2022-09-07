 import React,{ useState } from "react";
import CreateStudent from "../components/Student/createstudent";
import ReadStudent from "../components/Student/readstudentdata";
import ReadByname from "../components/Student/searchbyname";
import "../components/globalvariable";
 export default function StudentPage(props){
    const [flag, setflag] = useState(false);
    const [sflag, setsflag] = useState(false);
    const [cflag, setcflag] = useState(false);
    const [username,setusername] = useState();
    console.log(props.flagg)
    const handleClick=(event,param)=>{
        event.preventDefault();
        setflag(true)
        setcflag(false)
        setsflag(false)

   }
   const handleClick3=(event,param)=>{
    event.preventDefault();
    setcflag(false)
    setflag(false)
    setsflag(true)
}
   
   const handleClick2=(event)=>{
       event.preventDefault();
       setcflag(true)
       setsflag(false)
       setflag(false)
       }
  
    return(
        <div>
          <div>
            <button type="button" onClick={handleClick}>  See All Student 
             </button> &nbsp;
             <button type="button" onClick = {handleClick2}> Add
             </button> &nbsp;
             <input type="text" onChange={(event) => {
                  setusername(event.target.value);
                }} /> &nbsp;
               <button type="button" onClick = {handleClick3}> Search  </button>
            
             </div>
              
              {cflag && < CreateStudent />} 
              {flag && <ReadStudent/>}
              {sflag && < ReadByname susername = {username} />}
               {/* {global.flag && < ReadStudent /> }  */}
            {/* <input type="text" onChange={(event) => {
                setsflag(false)
                  setusername(event.target.value);
                }} /> &nbsp;
            <button type="button" onClick = {handleClick}> Search  </button> */}
            
            {/* <button onClick={event => ReadByname(event, 'hello world')}>Search</button> */}
            {/* {sflag && < ReadByname susername = {username} /> } */}
        </div>
    )
}