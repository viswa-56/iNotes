import React, { useContext } from 'react'
import Notes from '../components/notes';

const Home = (props) => {
    const {showAlert} = props;
    return (
        <div>
            <div className='container my-3'>
                <Notes showAlert={showAlert}/>
            </div>
        </div>
    )
}

export default Home
