import  { useState } from 'react';
import '../App.scss'

const Searchbooks =()=>{
    const [search, setbooks] = useState('')

    const handlesearch=(e)=>{
        e.preventDefault();
        setbooks(e.target.value)
    }  
    return(
        <>
        <div className='searchbtn'>
        <form action="" onClick={()=>(handlesearch)}>
            <input type="text" placeholder="Search Books" value={search}/>
            <button type="submit">Search</button>
        </form>
        </div>
        </>
    )
}
export default Searchbooks