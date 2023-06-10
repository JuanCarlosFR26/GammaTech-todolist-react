import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { RegisterLoginProvider } from '../context/RegisterLoginContext';


interface FormProps {
  title: string,
  buttonText: string,
  linkText: string
  path: string,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const FormComponent = ({ title, buttonText, linkText, path, onSubmit }: FormProps) => {

  const { setInputValues, inputValues } = useContext(RegisterLoginProvider);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues && setInputValues(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col items-center justify-evenly border border-solid w-80 h-96 gap-4 p-4 shadow-2xl rounded-xl'>
      <h2 className='font-bold text-3xl text-rose-600'>{title}</h2>
      <input onChange={handleChange} value={inputValues?.email} className='w-3/4 h-10 rounded-xl shadow-lg border border-solid pl-2 outline-none' type='email' name='email' placeholder='Email...' />
      <input onChange={handleChange} value={inputValues?.password} className='w-3/4 h-10 rounded-xl shadow-lg border border-solid pl-2 outline-none' type='password' name='password' placeholder='Password...' />
      <input className='border w-20 h-12 rounded-xl shadow-md font-bold bg-cyan-500 text-black cursor-pointer hover:bg-cyan-950 hover:text-white' type='submit' value={buttonText} />
      <Link className='text-cyan-400 cursor-pointer' to={path}>{linkText}</Link>
    </form>
  )
}

export default FormComponent