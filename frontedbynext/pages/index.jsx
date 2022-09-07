import React, {useState} from "react";
//import Button from "./component/buttoncomponent";
import 'bootstrap/dist/css/bootstrap.css';

function App(){
const [color, setColor] = useState(false);

function handleChangecolor (event)  {
    event.preventDefault();
    if(!color){
    event.target.className = "btn btn-warning center ";
    setColor(true);
    }
    else{
    event.target.className = "btn btn-primary center";
    setColor(false);
  }

     };
    

return (
   <div> 
   
      <button  type="button" className="btn btn-primary center"  
      onClick={handleChangecolor} name='button'>Clicked</button>
 
{/*<Button classname="btn btn-primary center" bname="Click Here To See Teacher's Info" onClick={handleChangecolor}    />
    <br /> <br />*/}
  
 </div>
)
}
export default App;