import React, {useState} from "react";
import { useRouter } from "next/router";
import ReadStudent from "../../components/Student/readstudentdata";

function DeleteStudent(props){
  console.log("Hello")
  let studentid=props.id;
    let data = ''
    const [launch, setlaunch] = useState(0);
    const [flag,setflag] = useState(false);
    const endpoint = "http://localhost:3000/graphql";
    const query = `
    mutation DeleteStudentbyid($postId: studentid!) {
        deleteStudentbyid(postId: $postId) {
          username
          age
          address
        }
      }
    `;
  const inputsend =  { 

        "postId": {
          "id": studentid
        }
      }
  
  const deleteStudent = (event)=>{
    event.preventDefault();
    setflag(true);
    fetch(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json",
                  "Accept":"application/json",
     },
      body: JSON.stringify({ query:query, variables: inputsend })
    }).then(Response=>Response.json())

    
}

return (
<>
    <div> 
      
          <button type="button" value="Submit" onClick={deleteStudent}>Confirm Delete</button>
          {flag && <ReadStudent/>}
         {/* {flag &&
           <div>
           <h1>Student</h1>
   <table className="table">
<tr>
 <th>Student Name</th>
 <th>Age</th>
 <th>Address</th>
</tr>
<tr>
 <th>{launch.username}</th>
 <th>{launch.age}</th>
 <th>{launch.address}</th>
</tr>
      </table>
         </div>
         } */}
          </div>
 </>
)
}
export default DeleteStudent;