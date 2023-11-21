interface ICustomButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode
}

const CustomButton = (props: ICustomButtonProps) => {
  const { children, onClick, type } = props
  return (
    <button
      type={type}
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "7.5px",
        margin: "20px 10px",
        border: "2px solid pink"
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CustomButton
