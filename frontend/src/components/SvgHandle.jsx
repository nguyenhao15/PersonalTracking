import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import {
    faPersonArrowUpFromLine,
    faQuestionCircle,
    faPeopleRoof,
    faUserGraduate,
    faReceipt,
    faShirt,
    faCoins,
    faHouseCrack,
    faPen,
    faHeart,
    faSuitcase,
    faMotorcycle,
    faChampagneGlasses,
    faUtensilSpoon,
    faHandHoldingDollar,
    faCoffee,
    faHeadphonesSimple,
    faUser,
    faMoneyBill,
    faGraduationCap,
    faBriefcase,
    faTachographDigital,
    faBuildingColumns,
    faPiggyBank,
    faSeedling
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
    developmentyourself: faPersonArrowUpFromLine,
    family: faPeopleRoof,
    edu: faUserGraduate,
    needsFee: faReceipt,
    clothing: faShirt,
    fee: faCoins,
    housing: faHouseCrack,
    edit: faPen,
    health: faHeart,
    work: faSuitcase,
    moving: faMotorcycle,
    consumption: faChampagneGlasses,
    dinning: faUtensilSpoon,
    giving: faHandHoldingDollar,
    coffee: faCoffee,
    entertaiment: faHeadphonesSimple,
    personal: faUser,
    salary: faMoneyBill,
    tutionFee: faGraduationCap,
    bussiness: faBriefcase,
    Digital: faTachographDigital,
    cash: faMoneyBill,
    bank: faBuildingColumns,
    saving: faPiggyBank,
    invest: faSeedling
};

const SvgHandle = ({ name, className = 'w-5 h-5', color = 'text-gray-600' }) => {
    const icon = iconMap[name] || faQuestionCircle;
    return (
        <FontAwesomeIcon icon={icon} className={`${className} ${color}`} />
    );
};

export default SvgHandle