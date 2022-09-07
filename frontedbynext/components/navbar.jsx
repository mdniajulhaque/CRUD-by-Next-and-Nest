import Link from 'next/link'
export default function Navbar() {
 return (
  <nav>
   <ul>
    <li><Link href="/"><a>Home</a></Link></li>
    {/* <li><Link href="/studentpage"><a>Student Page</a></Link></li> */}
    <li><Link href="/Student/readstudentdatapage"><a>Student Read Page</a></Link></li>
    </ul>
  </nav>
 )
}