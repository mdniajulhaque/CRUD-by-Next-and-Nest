import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { useState } from 'react';
import CreateStudent from '../../components/Student/createstudent';
import ReactPaginate from "react-paginate";     
export default  function ReadStudent({data}){
  const [flag,setflag] = useState(false);
  const [sflag,setsflag] = useState(false);
  const [username,setusername] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  function handleClick(event){
    event.preventDefault();
    if(flag)
    {setflag(false)}
    else
     setflag(true)
  }
  const ddeleteStudent = id =>{
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


const usersPerPage = 7;
const pagesVisited = pageNumber * usersPerPage;
const displayUsers = data.getAllStudent
.slice(pagesVisited, pagesVisited + usersPerPage)
.map((fdata) => {
  return (
    <tbody>
    <tr>
     <td style={{textAlign:'center'}}>{fdata.username}</td>
     <td>{fdata.age}</td>
    <td>{fdata.address}</td>
 <td>
 <Link
          href={{
            pathname: "/Student/readstudentdatapage",
           }}
        >
          <button  className="btn btn-light"  onClick={()=>ddeleteStudent(fdata._id)}>Delete</button>
        </Link>
       
        <Link
          href={{
            pathname: "/Student/updatestudent",
            query:{ pid: fdata._id,pusername:fdata.username,page:fdata.age,
              paddress:fdata.address }
          }}
        >
         <button  className="btn btn-light" >Update</button>
        </Link></td>
      </tr>
      </tbody>
    
    
  );
});
const pageCount = Math.ceil(data.getAllStudent.length / usersPerPage);
const changePage = ({ selected }) => {
  setPageNumber(selected);
}; 

return (
 <div> 
 <div className='d-flex justify-content-between'> 
    <div>
  <button type="button" className='btn btn-secondary btn-lg active marginadd'  onClick={handleClick} > ADD
  <i class="fa fa-plus-circle" style={{fontSize:25}}></i>
      </button> </div> 
      &nbsp; &nbsp;
     <div>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <form className="example" style={{margin:"auto",width:"300px"}}>
      <input type="text" placeholder="Search.." name="search2" onChange={(event) => {
          setusername(event.target.value);
        }} /> &nbsp;
        
      <Link
          href={{
            pathname: "/Student/searchbyname",
            query:{ susername: username }
          }}
        >
          <button type="button" onClick={()=>setsflag(true)}> <i className="fa fa-search"></i>  </button>
        </Link></form>
        </div>
    </div>
    <div>
    {flag && <CreateStudent/>}
    <div className='border p-3 mb-2 bg-secondary text-white margin'>
 <h1 className='center_h1'>Students List</h1></div>   <br />
 <table className="table table-striped">
  <thead>
  <tr>
 <th scope="col" style={{textAlign:'center'}}>  Student Name </th>
 <th scope="col"> Age</th>
 <th scope="col"> Address</th>
 <th scope="col"> Action On Student</th>
</tr>
</thead>
{displayUsers}
</table>
</div>
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

export async function getStaticProps () {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });
const { data } = await client.query({
  query: gql`
  query GetAllStudent {
    getAllStudent {
      _id
      username
      age
      address
    }
  }
  `
});
  return {
    props: {data},
    }
}


