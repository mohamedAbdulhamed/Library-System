import DashboardIcon from '../assets/icons/dashboard.svg';
import booksIcon from '../assets/icons/books.svg';
import usersIcon from '../assets/icons/users.svg';
import chaptersIcon from '../assets/icons/chapters.svg';
import requestsIcon from '../assets/icons/requests.svg';

import aboutIcon from '../assets/icons/about.svg';
import privacyIcon from '../assets/icons/privacy.svg';


const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: aboutIcon,
        path: '/about',
        title: 'About',
    },
    {
        id: 3,
        icon: privacyIcon,
        path: '/privacy',
        title: 'Privacy Policy',
    },
]

export default sidebar_menu;