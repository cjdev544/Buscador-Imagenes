import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Error from './Error'

const Form = ( { setMySearch, setResetPage } ) => {

    // useState
    const [ search, setSearch ] = useState('')
    const [ error, setError ] = useState( false )


    const sendSearch = e => {
        e.preventDefault()

        if( search.trim() === '' ) {
            setError( true )
            return
        }

        setError( false )
        setMySearch( search )
        setResetPage( true )
    }

    return ( 
        <form
            onSubmit={ sendSearch }
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className= "form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={ e => setSearch( e.target.value ) }
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            { error ? <Error message="Debes escribir alguna busqueda" /> : null}
        </form>
     )
}

Form.propTypes = {
    setMySearch: PropTypes.func.isRequired,
    setResetPage: PropTypes.func.isRequired
}
 
export default Form