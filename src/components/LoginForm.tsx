import { signInWithEmailAndPassword } from 'firebase/auth';
import { RegisterLoginProvider } from '../context/RegisterLoginContext';
import FormComponent from './FormComponent'
import { useContext } from 'react'
import { auth } from '../.firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const { setInputValues, inputValues } = useContext(RegisterLoginProvider);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputValues && signInWithEmailAndPassword(auth, inputValues.email, inputValues.password)
      .then((userCredentials) => {
        const user = userCredentials.user
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })

      navigate('/');
  }

  return (
    <div className="flex justify-center items-center">
        <FormComponent onSubmit={handleSubmit} title='Sign in' buttonText='Login' linkText="Don't have an account?" path='/register'/>
    </div>
  )
}

export default LoginForm