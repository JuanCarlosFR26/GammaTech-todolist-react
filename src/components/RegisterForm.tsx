import FormComponent from './FormComponent';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../.firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RegisterLoginProvider } from '../context/RegisterLoginContext';
import { doc, setDoc } from "firebase/firestore";

const RegisterForm = () => {

  const { setInputValues, inputValues } = useContext(RegisterLoginProvider);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputValues && createUserWithEmailAndPassword(auth, inputValues.email, inputValues.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          id: user.uid,
          todos: []
        })
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })

      navigate('/login');
  }
  return (
    <div className="flex justify-center items-center">
        <FormComponent title='Register' buttonText='Create' linkText='Already have an account?' path='/login' onSubmit={handleSubmit}/>
    </div>
  )
}

export default RegisterForm