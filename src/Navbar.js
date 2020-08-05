import React, {useEffect, useState} from 'react';
import './nav.css'

const Navbar = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY>100){
                setShow(true);
            }else{
                setShow(false);
            }
        });
        return()=>{
            window.removeEventListener("scroll");
        }
    },[])

    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <img
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />

            <img
                className="nav_avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/VisualEditor_icon_profile-progressive.svg/1024px-VisualEditor_icon_profile-progressive.svg.png"
                alt="Netflix Avatar"
            />

        </div>
    );
};

export default Navbar;
