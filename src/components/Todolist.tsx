import { useContext, useEffect, useState } from 'react'
import { Context, UserProvider } from '../context/UserContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../.firebase/firebaseConfig';
import ModalRegisterLogin from './ModalRegisterLogin';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Todolist = () => {

  const navigate = useNavigate()

  const { currentUser } = useContext(UserProvider) as Context;

  const [todolist, setTodoList] = useState<{ todo: string, priority: string, deadline: string, tag: string }[]>([])

  const [modal, setModal] = useState(false);

  const [formValues, setFormValues] = useState({
    todo: '',
    priority: '',
    deadline: '',
    tag: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.id);
      const docSnap = await getDoc(docRef);
      await updateDoc(docRef, {
        todos: [...todolist, formValues]
      })
    }


  }

  const getUser = async () => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTodoList(docSnap.data().todos)
      }
    }
  }

  const disconect = () => {
    signOut(auth).then(() => {
      console.log('correct');
    })
    navigate('login')
  }

  useEffect(() => {
    if (currentUser.id) {
      getUser()
      setModal(true);
      setTimeout(() => {
        setModal(false)
      }, 3000)
    } else {
      navigate('/login')
    }
  }, [])

  console.log(todolist);

  return (
    <div>
      {
        modal && <ModalRegisterLogin text={`Bienvenido ${currentUser.email}`} className='mt-4 p-4 flex items-center justify-center bg-green-500 rounded-xl text-white font-bold' />
      }
      {
        (currentUser.id) && <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='todo'>Insert Todo:</label>
              <input onChange={handleChange} type='text' name='todo' />
            </div>
            <div>
              <label htmlFor='priority'>Priority:</label>
              <select onChange={handleChange} name='priority'>
                <option value={''} disabled selected></option>
                <option value={'low'}>Low</option>
                <option value={'medium'}>Medium</option>
                <option value={'high'}>High</option>
              </select>
            </div>
            <div>
              <label htmlFor='deadline'>Deadline:</label>
              <input onChange={handleChange} type='date' name='deadline' />
            </div>
            <div>
              <label htmlFor='tag'>Tag:</label>
              <input onChange={handleChange} type='text' name='tag' />
            </div>
            <input type='submit' value={'Create'} />
          </form>
          <button onClick={() => disconect()}>Log out</button>
        </div>
      }
    </div>
  )
}

export default Todolist