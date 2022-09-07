import Link from "next/link";
import React, {useState,} from "react";
const endpoint = "http://localhost:3000/graphql";
import StudentPage from "../../pages/studentpage";

import ReactPaginate from "react-paginate";     
import { useRouter } from "next/router";
export default function ReadByname(){
  const router = useRouter();
  let props = router.query;
let data='';
const [launch, setlaunch] = useState([]);
const [dflag,setdflag] =useState(false)
const [uname,setuname] = useState(props.susername)
const [pageNumber, setPageNumber] = useState(0);

const query = `  query Query($readstudent: studentname!) {
    getAllStudentbyname(readstudent: $readstudent) {
      _id
      username
      age
      address
    }
  }
`;
const inputsend = 
    {
    "readstudent": {
    "username": uname
            }
          }
    React.useEffect(() => {
        fetch(endpoint, {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ query: query, variables: inputsend })
               }).then(Response=>Response.json())
               .then(data => setlaunch(data.data.getAllStudentbyname) )},[]);


      const ddeleteStudent = id =>{
      //event.preventDefault();
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
          "id": id
        }
      }
      fetch(endpoint, {
        method: 'POST',
        headers: { "Content-Type": "application/json",
                    "Accept":"application/json",
        },
        body: JSON.stringify({ query:query, variables: inputsend })
      }).then(Response=>Response.json())
  }
 const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = launch
.slice(pagesVisited, pagesVisited + usersPerPage)
.map((user) => {
  return (
    <tbody>
    <tr>
      <td style={{textAlign:'center'}}>{user.username}</td>
      <td>{user.age}</td>
      <td>{user.address}</td>
      <td>
      <Link
          href={{
            pathname: "/Student/readstudentdatapage"
         }
        }
        >
          <button  className="btn btn-light" onClick={()=>ddeleteStudent(user._id)}>Delete</button>
        </Link>
  <Link
          href={{
            pathname: "/Student/updatestudent",
            query:{ pid: user._id,pusername:user.username,page:user.age,
              paddress:user.address }
          }}
        >
        <button  className="btn btn-light" >Update</button>
        </Link>
    </td>
      </tr>
      </tbody>
    
  );
});
const pageCount = Math.ceil(launch.length / usersPerPage);
const changePage = ({ selected }) => {
  setPageNumber(selected);
}; 

return (
   <div> 
          <table className="table table-striped">
            <thead>
        <tr>
      <th style={{textAlign:'center'}}>Student Name</th>
      <th>Age</th>
      <th>Address</th>
      <th>Action On Student</th>
      </tr>
      </thead>
       {displayUsers}
      </table>
     <div > 
      < ReactPaginate
       previousLabel={"Previous"}
       nextLabel={"Next"}
       pageCount={pageCount}
       onPageChange={changePage}
       containerClassName={"paginationBttns"}
       previousLinkClassName={"previousBttn"}
       nextLinkClassName={"nextBttn"}
       disabledClassName={"paginationDisabled"}
       activeClassName={"paginationActive"}
     />  
   </div>
 </div>
)
}
