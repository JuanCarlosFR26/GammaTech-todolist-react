import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth } from '../.firebase/firebaseConfig';

type Props = {
    children: React.ReactNode
}
interface CurrentUser {
    email: string,
    id: string
}

export interface Context {
    currentUser: CurrentUser,
    setCurrentUser?: React.Dispatch<React.SetStateAction<CurrentUser>>
}


export const UserProvider = createContext({});

const UserContext = ({ children }: Props) => {

    const [currentUser, setCurrentUser] = useState<CurrentUser>({
        email: '',
        id: ''
    })

    const getCurrentUser = () => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser({email: user.email, id: user.uid})
                const uid = user.uid;
            } else {
                console.log('User not found');
            }
        })
    }

    useEffect(() => {
        getCurrentUser();
    }, [])

    return (
        <UserProvider.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserProvider.Provider>
    )
}

export default UserContext