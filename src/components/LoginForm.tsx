import { signInWithEmailAndPassword } from 'firebase/auth';
import { RegisterLoginProvider } from '../context/RegisterLoginContext';
import FormComponent from './FormComponent'
import { useContext, useState } from 'react'
import { auth } from '../.firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import ModalRegisterLogin from './ModalRegisterLogin';

const LoginForm = () => {

  const { setInputValues, inputValues } = useContext(RegisterLoginProvider);

  const [modal, setModal] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputValues && signInWithEmailAndPassword(auth, inputValues.email, inputValues.password)
      .then((userCredentials) => {
        const user = userCredentials.user
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setModal(true)
        setTimeout(() => {
          setModal(false)
        }, 3000)
      })

    navigate('/');
  }

  return (
    <div className="flex justify-center items-center mt-40">
      <FormComponent onSubmit={handleSubmit} title='Log in' buttonText='Login' linkText="Don't have an account?" path='/register' />
      {
        modal && <ModalRegisterLogin text='Invalid User' className='flex items-center justify-center bg-red-800 rounded-xl text-white font-bold' />
      }
    </div>
  )
}

export default LoginForm