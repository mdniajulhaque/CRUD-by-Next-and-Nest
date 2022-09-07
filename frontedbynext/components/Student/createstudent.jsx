import Link from "next/link";
import React, {useState} from "react";
import ReadStudent from "../../pages/Student/readstudentdatapage";
function CreateStudent(){
    let data = ''
    const [username, setusername] = useState();
    const [age, setage] = useState(55);
    const [address, setaddress] = useState();
    const [launch, setlaunch] = useState(0);
    const [formOpen,setformOpen] = useState(false);
    const [flag,setflag] = useState(false);
    const [cflag, setcflag] = useState(false);
    const [c2flag, setc2flag] = useState(false);
    const [c3flag, setc3flag] = useState(true);
    var a = age
    a = parseInt(a)
    const endpoint = "http://localhost:3000/graphql";
    const query = `
    mutation CreateStudent($input: CreatestudentInput!) {
        createStudent(input: $input) {
          username
          age
          address
        }
      }
    `;
  const inputsend =  { "input": {
    "username": username,
    "age": a,
    "address": address
  }  
}

  const saveUser = (event)=>{
    event.preventDefault()
  
  setflag(true);
  fetch(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json",
                  "Accept":"application/json",
     },
      body: JSON.stringify({ query:query, variables: inputsend })
   }).then(Response=>Response.json())
    .then(data => setlaunch(data.data.createStudent) )
}
return (
  <>
    <div>  <br />
  <form onSubmit={saveUser} className={"marginadd"}>
    <label className="initialism">
      Student Name: <br />
      <input type="text" className="form-control" placeholder="Full Name" onChange={(event) => {
        setusername(event.target.value),setflag(false)
      }}  />
    </label><br /><br />
    <label className="initialism"> 
      Age: <br />
      <input type="number" className="form-control" placeholder="Age" onChange={(event) => {
        setage(event.target.value);
      }}  />
    </label><br /><br />
    <label className="initialism"> 
      Address: <br />
      <input type="text" className="form-control" placeholder="Address" onChange={(event) => {
        setaddress(event.target.value);
      }}    />
    </label><br /> <br />
    {/* <button type="submit" value="Submit">Submit</button> */}
    
<button  className="btn btn-light" type="submit" value="Submit" >Submit</button>
  </form> 
      {flag && <Link
    href={{
      pathname: "/Student/readstudentdatapage",
    }}
  >
    <button type="submit" value="Submit" className="btn btn-light marginadd"  >See List</button>
  </Link>}
    </div>
</>
)
}
export default CreateStudent;