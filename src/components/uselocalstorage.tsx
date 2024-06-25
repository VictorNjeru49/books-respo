import { useEffect, useState } from 'react'

export default function Uselocalstorage() {

    const [books, setBooks] = useState(()=>{

        try{
            const booking = localStorage.getItem('books');
            if(booking != null) {
                return JSON.parse(booking)
            }

        } catch(error) {
            (error)
        }


    })

    useEffect(()=>{
        localStorage.setItem('books', JSON.stringify(books))
    },[books])

    return[books, setBooks]

}
