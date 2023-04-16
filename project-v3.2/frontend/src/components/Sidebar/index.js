import React, {useEffect, useState} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import SideBarItem from './sidebar-item';

import './styles.css';
import logo from '../../assets/images/white-logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';

function SideBar ({ menu }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [active, setActive] = useState(1);
    axios.defaults.withCredentials = true;
    useEffect(() => {
        menu?.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }

    function LogOut() {
        axios.get('http://localhost:7000/logout')
        .then(res => {if (res.data.Status === 'Success') window.location.href = '/login'; else alert("Error occured!")})
        .catch(err=> alert("Error occured!"))
    }

    return(
        <>
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    <img 
                        src={logo}
                        alt="logo" />
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu?.map((item, index) => (
                            <div key={index} onClick={() => __navigate(item.id)}>
                                <SideBarItem
                                    active={item.id === active}
                                    item={item} />
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer' onClick={LogOut}>
                        <span className='sidebar-item-label'>Logout</span>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon' />
                    </div>
                </div>
            </div>
        </nav>
        <Outlet />
        </>
    )
}

export default SideBar;