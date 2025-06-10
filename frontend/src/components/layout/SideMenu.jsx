import { ArrowRightLeft, Home, Plus, PlusCircleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { SIDE_MENU_DATA } from '../../lib/data';


const SideMenu = ({ activeMenu }) => {
    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
    };
    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-base border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            {
                SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? "text-white bg-black" : "text-black"
                            } py-3 px-6 rounded-lg mb-3`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                ))};
        </div>
    )
};

export default SideMenu