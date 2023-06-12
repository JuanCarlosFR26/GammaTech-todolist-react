import { useContext, useEffect, useState } from 'react'
import { Context, UserProvider } from '../context/UserContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../.firebase/firebaseConfig';
import ModalRegisterLogin from './ModalRegisterLogin';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Todotask from './Todotask';

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
      setTodoList([...todolist, formValues]);
    }

    console.log(todolist);


  }

  const getUser = async () => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTodoList(docSnap.data().todos)
        // setModal(true);
        // setTimeout(() => {
        //   setModal(false)
        // }, 3000)
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
          <form className='flex flex-col items-center gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col items-center gap-2'>
              <label htmlFor='todo'>Insert Todo:</label>
              <input className='border outline-none pl-4 h-8 rounded-xl' onChange={handleChange} type='text' name='todo' />
            </div>
            <div className='flex flex-col items-center'>
              <label htmlFor='priority'>Priority:</label>
              <select className='border outline-none h-8 rounded-xl' onChange={handleChange} name='priority'>
                <option value={''} disabled selected></option>
                <option value={'low'}>Low</option>
                <option value={'medium'}>Medium</option>
                <option value={'high'}>High</option>
              </select>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <label htmlFor='deadline'>Deadline:</label>
              <input className='border outline-none pl-4 h-8 rounded-xl' onChange={handleChange} type='date' name='deadline' />
            </div>
            <div className='flex flex-col items-center'>
              <label htmlFor='tag'>Tag:</label>
              <input className='border outline-none pl-4 h-8 rounded-xl' onChange={handleChange} type='text' name='tag' />
            </div>
            <input className='border p-4 rounded-xl font-bold bg-cyan-800 text-white cursor-pointer hover:bg-cyan-400 hover:text-black' type='submit' value={'Create'} />
          </form>
          {
            currentUser && <button className='absolute top-6 right-12 border p-2 rounded-xl hover:bg-pink-950 hover:text-white font-bold bg-pink-600' onClick={() => disconect()}>Log out</button>
          }
        </div>
      }
      <hr className='mt-10'></hr>
      <div className='mt-10 flex p-10 gap-20'>
        {
          todolist && todolist.map((task, i) => (
            <div>
              <Todotask cssPriority={`${task.priority === 'low' ? 'bg-green-200' : (task.priority === 'medium') ? 'bg-orange-200' : 'bg-pink-700'}`} key={i} title={task.todo} priority={task.priority} tag={task.tag} deadline={task.deadline} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Todolist