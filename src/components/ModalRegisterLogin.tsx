interface Props {
    text: string,
    className: string
}

const ModalRegisterLogin = ({text, className}: Props) => {
  return (
    <div className={className}>
        <p>{text}</p>
    </div>
  )
}

export default ModalRegisterLogin