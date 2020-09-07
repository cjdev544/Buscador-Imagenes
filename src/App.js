import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Axios from 'axios'
import ImagesList from './components/ImagesList'

function App() {

  // useState
  const [ mysearch, setMySearch ] = useState('')
  const [ actualpage, setActualPage ] = useState(1)
  const [ numberofpage, setNumberOfPage ] = useState(10)
  const [ images, setImages ] = useState([])
  const [ showbuttons, setShowButtons ] = useState( false )
  const [ resetpage, setResetPage ] = useState( false )


  // useEffect
  useEffect( () => {
    
    if( mysearch === '' ) return
      
    const resApi = async () => {
      if( resetpage ) setActualPage( 1 ) 
      const perPage = 32
      const key = '18213907-a796b6b2f38a4558596eaffe6'
      const url = `https://pixabay.com/api/?key=${key}&q=${mysearch}&per_page=${perPage}&page=${actualpage}`
      const res = await Axios.get( url )
      const dataApi = res.data
      setImages( dataApi.hits )

      // Number of pages
      const numberPages = Math.ceil( dataApi.totalHits / perPage )
      setNumberOfPage( numberPages )

      // Moov auto scroll
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })

      setShowButtons( true )
      setResetPage( false )
    }
    
    resApi()

  }, [ mysearch, actualpage, resetpage ])

  const prevPage = () => {
    const newActualPage = actualpage - 1

    if( newActualPage < 1 ) return 

    setActualPage( newActualPage )
  }

  const nextPage = () => {
    const newActualPage = actualpage + 1

    if( newActualPage > numberofpage) return

    setActualPage( newActualPage )
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Form
          setMySearch={ setMySearch }
          setResetPage = { setResetPage }
        />
      </div>
      <div className="row justify-content-center">
        <ImagesList 
          images={ images }
        />
        {
          ( actualpage === 1 || !showbuttons) ? null : 
            (
              <button 
                type="button"
                className="bbtn btn-info mr-5 mb-5"
                onClick={ prevPage }
              >
                 &laquo; Anterior
              </button>
            )
        }
        {
          ( actualpage === numberofpage || !showbuttons ) ? null : 
            (
              <button 
                type="button"
                className="bbtn btn-info mb-5"
                onClick={ nextPage }
              >
                 Siguiente &raquo; 
              </button>
            )
        }        
      </div>
    </div>
  );
}

export default App;