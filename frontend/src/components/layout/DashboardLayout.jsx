import NavBar from './NavBar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
    return (
        <div className=''>
            <NavBar activeMenu={activeMenu} />
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
                <div className='grow mx-5 mb-5'>{children}</div>
            </div>
        </div>
    )
}

export default DashboardLayout