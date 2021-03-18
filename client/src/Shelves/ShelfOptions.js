import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

export default function ShelfOptions(login, setLogin) {
    // const [name, setName] = useState();

    async function removeShelf(index){
        const shelves = login.login.shelves;
        shelves.splice(index, 1);

        await axios.get(`https://goodoakfurniture.co.za/${login.login.profile._id}/${index}/remove-shelf`)
        .then(res => {
            login.setLogin({...login.login, shelves : shelves});
        })
    }

    async function addShelf(name) {
        const shelves = login.login.shelves;
        shelves.push({name : name, books : []});

        await axios.get(`https://goodoakfurniture.co.za/${login.login.profile._id}/add-shelf`)
        .then(res => {
            login.setLogin({...login.login, shelves : shelves});
        })
    }

    async function editShelf(index){
        const shelves = login.login.shelves;
        const name = window.prompt('Enter the name of your Shelf: ');

        shelves[index].name = name;

        await axios.get(`https://goodoakfurniture.co.za/${login.login.profile._id}/${index}/${name}/edit-shelf`)
        .then(res => {
            login.setLogin({...login.login, shelves : shelves});
        })
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
                            <div style={{minWidth: '20px'}}></div>
                            <i style={{paddingLeft: '10px'}} className='fa fa-pencil-square' onClick={() => editShelf(index)}/>
                            <i style={{paddingLeft: '10px'}} className='fa fa-times' onClick={() => removeShelf(index)}/>
                        </div>
                    </>
                )}
                <br/>
                <button style={{borderRadius: '10px', color : 'white', background: 'none', border: '1px solid white'}} onClick={() => addShelf('New Shelf')}>+</button>
            </Container>
        )
    }

    
}
