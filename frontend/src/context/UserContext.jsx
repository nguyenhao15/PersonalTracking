import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.children
            value={{
                user,
                updateUser,
                clearUser
            }}
        >
            {children}
        </UserContext.children>
    );
}

export default UserProvider;