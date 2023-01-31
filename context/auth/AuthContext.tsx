

import { createContext } from 'react';
import { IUser } from '@/interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<boolean>;
    logOut: () => void;
}


export const AuthContext = createContext({} as ContextProps );