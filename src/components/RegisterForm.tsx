import FormComponent from './FormComponent';

const RegisterForm = () => {
  return (
    <div className="flex justify-center items-center">
        <FormComponent title='Register' buttonText='Create' linkText='Already have an account?' path='/login'/>
    </div>
  )
}

export default RegisterForm