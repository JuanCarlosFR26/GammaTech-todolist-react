import { createContext, useState } from 'react';
import { FormRegister } from '../type';

interface FormState {
    inputValues: FormRegister
}

type Props = {
    children: React.ReactNode
}

interface RegisterContext {
    inputValues?: FormRegister,
    setInputValues?: React.Dispatch<React.SetStateAction<FormRegister>>
}

export const RegisterLoginProvider = createContext<RegisterContext>({})

const RegisterLoginContext = ({ children }: Props) => {

    const [inputValues, setInputValues] = useState<FormRegister>({
        email: '',
        password: ''
    });

    return (
        <RegisterLoginProvider.Provider value={{ inputValues, setInputValues }}>
            {children}
        </RegisterLoginProvider.Provider>
    )
}

export default RegisterLoginContext