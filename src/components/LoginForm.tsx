import { signInWithEmailAndPassword } from 'firebase/auth';
import { RegisterLoginProvider } from '../context/RegisterLoginContext';
import FormComponent from './FormComponent'
import { useContext, useState } from 'react'
import { auth } from '../.firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import ModalRegisterLogin from './ModalRegisterLogin';

const LoginForm = () => {

  const { inputValues } = useContext(RegisterLoginProvider);

  const [modal, setModal] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = inputValues && await signInWithEmailAndPassword(auth, inputValues.email, inputValues.password)
      navigate('/')
      return response?.user.uid
    } catch (e) {
      console.log((e as Error).message);
      setModal(true)
      setTimeout(() => {
        setModal(false)
      }, 3000)

    }
  }

  return (
    <div className="flex justify-center items-center mt-40 flex-col">
      <FormComponent onSubmit={handleSubmit} title='Log in' buttonText='Login' linkText="Don't have an account?" path='/register' />
      {
        modal && <ModalRegisterLogin text='Invalid User' className='mt-4 p-4 flex items-center justify-center bg-red-800 rounded-xl text-white font-bold' />
      }
    </div>
  )
}

export default LoginForm