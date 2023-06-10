import { useContext, useEffect, useState } from 'react'
import { Context, UserProvider } from '../context/UserContext'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../.firebase/firebaseConfig';
import ModalRegisterLogin from './ModalRegisterLogin';

const Todolist = () => {

  const { currentUser } = useContext(UserProvider) as Context;

  const [todolist, setTodoList] = useState<{todo: string, priority: string, deadline: string, tag: string}[]>([])

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoList([...todolist, formValues])
  }

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

  console.log(todolist);
  

  return (
    <div>
      {
        modal && <ModalRegisterLogin text={`Bienvenido ${currentUser.email}`} className='mt-4 p-4 flex items-center justify-center bg-green-500 rounded-xl text-white font-bold' />
      }
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
          <label htmlFor='date'>Deadline:</label>
          <input onChange={handleChange} type='date' name='date' />
        </div>
        <div>
          <label htmlFor='tag'>Tag:</label>
          <input onChange={handleChange} type='text' name='tag' />
        </div>
        <input type='submit' value={'Create'}/>
      </form>
    </div>
  )
}

export default Todolist