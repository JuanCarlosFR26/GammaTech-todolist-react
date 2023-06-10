import { useContext, useEffect, useState } from 'react'
import { Context, UserProvider } from '../context/UserContext'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../.firebase/firebaseConfig';
import ModalRegisterLogin from './ModalRegisterLogin';

const Todolist = () => {

  const { currentUser } = useContext(UserProvider) as Context;

  const [todolist, setTodoList] = useState([])

  const [modal, setModal] = useState(false);

  console.log(currentUser)

  const getUser = async () => {
    if (currentUser.id) {
      const docRef = doc(db, "users", currentUser.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTodoList(docSnap.data().todos)
      }
    }
  }

  useEffect(() => {
    getUser()
    setModal(true);
    setTimeout(() => {
      setModal(false)
    }, 3000)
  }, [])

  return (
    <div>
      {
        modal && <ModalRegisterLogin text={`Bienvenido ${currentUser.email}`} className='mt-4 p-4 flex items-center justify-center bg-green-500 rounded-xl text-white font-bold'/>
      }
    </div>
  )
}

export default Todolist