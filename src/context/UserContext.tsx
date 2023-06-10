import { createContext, useState } from 'react';
import { FormRegister } from '../type';

type Props = {
    children: React.ReactNode
}

interface Context {
    user: FormRegister,
    setUser: React.Dispatch<React.SetStateAction<FormRegister>>
}


export const UserProvider = createContext<Context | null>(null);

const UserContext = ({ children }: Props) => {

    const [user, setUser] = useState<FormRegister>({
        email: '',
        password: ''
    })

    return (
        <UserProvider.Provider value={{ user, setUser }}>
            {children}
        </UserProvider.Provider>
    )
}

export default UserContext