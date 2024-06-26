
import '../App.scss'
const Findbooks=()=>{

    
    return(
        <>
<div className="books">
<form action="" className='formname'>
  <fieldset>
  <label htmlFor="title">TITLE</label>
  <input type="text" name="" id="title" />

  <label htmlFor="author">AUTHOR</label>
  <input type="text" name="" id="author" />

  <label htmlFor="price">PRICE</label>
  <input type="text" name="" id="price" />

  <label htmlFor="publication">YEAR PUBLISHED</label>
  <input type="text" name="" id="publication" />

  <button type="button">Submit</button>
  </fieldset>

</form>
</div>
        </>
    )
}
export default Findbooks