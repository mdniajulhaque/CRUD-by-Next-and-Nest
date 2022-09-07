import Link from "next/link";
import React, {useState,} from "react";
const endpoint = "http://localhost:3000/graphql";
import StudentPage from "../../pages/studentpage";

import ReactPaginate from "react-paginate";     
export default function ReadByname(props){
let data='';
const [launch, setlaunch] = useState([]);
const [dflag,setdflag] = useState(false)
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
    "username": props.susername
            }
          }
    React.useEffect(() => {
        fetch(endpoint, {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ query: query, variables: inputsend })
               }).then(Response=>Response.json())
               .then(data => setlaunch(data.data.getAllStudentbyname) )},[]);


  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = launch
.slice(pagesVisited, pagesVisited + usersPerPage)
.map((user) => {
  return (
    <tr>
      <th>{user.username}</th>
      <th>{user.age}</th>
      <th>{user.address}</th>
      <th>
      <Link
          href={{
            pathname: "/Student/deletestudent",
            query:{ pid: user._id }
          }}
        >
          <button  className="btn btn-light" >Delete</button>
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
    </th>
      </tr>
    
    
  );
});
const pageCount = Math.ceil(launch.length / usersPerPage);
const changePage = ({ selected }) => {
  setPageNumber(selected);
}; 

return (
   <div> 
          <table className="table">
        <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Address</th>
      <th>Action</th>
      </tr>
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
 {dflag && <DeleteStudent/>}
 </div>
)
}
