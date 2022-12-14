import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.png';


const ContactCard = (props) => {
    const { id, name, email } = props.contact;

    return (
        <div className="item">
            <img className='ui avatar image' src={user} alt='user'></img>
            <div className="content">
                <Link to={`contact/${id}`} state={{ contact: props.contact }}>

                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>

            </div>
            <i className="trash alternate outline icon" style={{ color: "red", paddingLeft: "500px" }}
                onClick={() => props.clickHandler(id)}></i>

            <Link to={`/edit`} state={{ contact: props.contact }}>
                <i className="edit alternate outline icon" style={{ color: "blue" }}></i>
            </Link>


        </div>
    )

}

export default ContactCard;