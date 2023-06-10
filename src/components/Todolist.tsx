import { useContext, useEffect, useState } from 'react'
import { Context, UserProvider } from '../context/UserContext'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../.firebase/firebaseConfig';

const Todolist = () => {

  const { currentUser } = useContext(UserProvider) as Context;

  const [todolist, setTodoList] = useState([])

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
  }, [])

  return (
    <div></div>
  )
}

export default Todolist