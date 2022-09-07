import React, {useState} from "react";
import { useRouter } from "next/router";
import ReadStudent from "../../components/Student/readstudentdata";
function UpdateStudent(){
  const router = useRouter();
  let querye = router.query;
  let studentid=querye.pid;
    let data = ''
    const [username, setusername] = useState(querye.pusername);
    const [age, setage] = useState(querye.page);
    const [address, setaddress] = useState(querye.paddress);
    const [launch, setlaunch] = useState(0);
    const [formOpen,setformOpen] = useState(false);
    const [flag,setflag] = useState(false);
    const [uflag,setuflag] = useState(false);
    const [u2flag,setu2flag] = useState(false);
    const [u3flag,setu3flag] = useState(true);
    let a = age
    a = parseInt(a)
    const endpoint = "http://localhost:3000/graphql";
    const query = `
    mutation UpdateStudent($updatestudent: UpdatestudentInput!) {
        updateStudent(updatestudent: $updatestudent) {
          username
          age
          address
        }
      }
    `;
  const inputsend = 
    {
        "updatestudent": {
          "id": studentid,
          "username": username,
          "age": a,
          "address": address
        }
      }

  
  const updateStudent = (event)=>{
    event.preventDefault();
    setflag(true);
    fetch(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json",
                  "Accept":"application/json",
     },
      body: JSON.stringify({ query:query, variables: inputsend })
    }).then(Response=>Response.json())
    .then(data => setlaunch(data.data.updateStudent) )
    if(!uflag&&!u2flag){
      setuflag(true)
    }
  
    else if(uflag && !u2flag){
      setuflag(false)
      setu2flag(true)
    }
    else{
      setuflag(true)
      setu2flag(false)
    }
   setu3flag(false)
}


return (
  <>
    <div> 
    <form onSubmit={updateStudent} className={"marginadd"}>
              <label className="initialism">
                Student Name: <br />
                <input type="text" className="form-control" defaultValue={username}  onChange={(event) => {
                  setusername(event.target.value);
                }} />
              </label><br /><br />
              <label className="initialism"> 
                Age: <br />
                <input type="number" className="form-control" defaultValue={age} onChange={(event) => {
                  setage(event.target.value);
                }}  />
              </label><br /><br />
              <label className="initialism"> 
                Address: <br />
                <input type="text" className="form-control" defaultValue={address}  onChange={(event) => {
                  setaddress(event.target.value);
                }}    />
              </label><br /> <br />
              <button type="submit" value="Submit" className="btn btn-outline-dark">Confirm Update</button>
              
            </form>  

        {u3flag &&  <  ReadStudent />}
        {uflag &&  <  ReadStudent />}
        {u2flag &&  <  ReadStudent />}
          
          </div>
 </>
)
}
export default UpdateStudent;