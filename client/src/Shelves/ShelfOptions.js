import React from 'react';
import { Container } from 'react-bootstrap';

export default function ShelfOptions(login, setLogin) {
    function removeShelf(index){
        const shelves = login.login.shelves;
        shelves.splice(index, 1);

        login.setLogin({...login.login, shelves: shelves});
    }

    console.log(login);

    if(login.login['shelves'] === undefined){
        return (null)
    } else {
        return (
            <Container fluid style={{textAlign: 'center', width: '80vw'}}>
                <h1>My Shelves</h1>
                <br/>
                {login.login['shelves'].map((item, index) => 
                    <>
                        <div style={{borderBottom: '1px solid white'}}></div>
                        <div style={{height: "40px", display: 'flex', alignItems: 'center'}}>
                            <h5 style={{paddingLeft: '10px'}}>{item.name}</h5>
                            <i style={{position: 'absolute', right: '11vw' ,padding: '10px'}} className='fa fa-times' onClick={() => removeShelf(index)}/>
                        </div>
                    </>
                )}
                <br/>
                <button>Add Shelf +</button>
            </Container>
        )
    }

    
}
