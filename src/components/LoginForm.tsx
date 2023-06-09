import FormComponent from './FormComponent'

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center">
        <FormComponent title='Sign in' buttonText='Login' linkText="Don't have an account?" path='/register'/>
    </div>
  )
}

export default LoginForm