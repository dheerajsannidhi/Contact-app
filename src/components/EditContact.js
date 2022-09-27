import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




export default function EditContact(props) {
    const location = useLocation();
    const [state, setState] = React.useState({
        id : location.state.contact.id,
        name : location.state.contact.name,
        email : location.state.contact.email,
    });

    console.log("state----------->", state);
    const history = useNavigate();
   

    const update = (e) => {
        
        if (state.name === "" || state.email === "") {
            alert("All fields are mandatory")
        }
        props.updateContactHandler(state);
      
        history('/');
        
       
    };

   



    return (
        <div className='ui main'>
            <h2 style={{ marginTop: "60px" }}>Edit Contact</h2>
            <form className='ui form' onSubmit={update}>
                <div className='field'>
                    <label>Name</label>
                    <input type="text" name="name" placeholder='Enter your Name'
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })} />
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type="text" name="email" placeholder='Enter your Email'
                        value={state.email}
                        onChange={(e) => setState({ ...state,email: e.target.value })} />
                </div>
                <button className='ui button blue'>Update</button>
                <Link to="/">
                    <button className='ui button blue right' style={{ marginLeft: "300px" }}>See Contact List</button>
                </Link>
            </form>


        </div>

    )

}
