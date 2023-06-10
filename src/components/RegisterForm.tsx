import FormComponent from './FormComponent';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../.firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { RegisterLoginProvider } from '../context/RegisterLoginContext';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { UserProvider } from '../context/UserContext';
import { Context } from 'vm';
import ModalRegisterLogin from './ModalRegisterLogin';

const RegisterForm = () => {

  const { currentUser } = useContext(UserProvider) as Context;

  const { inputValues } = useContext(RegisterLoginProvider);
  // const { setCurrentUser } = useContext(UserProvider) as Context
  const [modal, setModal] = useState(false)
  const [existingUser, setExistingUser] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usersRef = doc(db, 'users', currentUser.id);
    const usersSnap = await getDoc(usersRef);
    // const q = query(collection(db, 'users'), where('id', "==", currentUser.id))
    // const qSnapShot = await getDocs(q);

    // qSnapShot.forEach((doc) => {
    //   setExistingUser(doc.id);
    // })

    if (!usersSnap.exists()) {
      inputValues && await createUserWithEmailAndPassword(auth, inputValues.email, inputValues.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user);
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
    } else {
      setModal(true)
      setTimeout(() => {
        setModal(false)
      }, 3000)
    }
  }
  return (
    <div className="flex justify-center items-center mt-40 flex-col">
      <FormComponent title='Register' buttonText='Create' linkText='Already have an account?' path='/login' onSubmit={handleSubmit} />
      {
        modal && <ModalRegisterLogin text='This user already exists' className='mt-4 p-4 flex items-center justify-center bg-red-800 rounded-xl text-white font-bold' />
      }
    </div>
  )
}

export default RegisterForm