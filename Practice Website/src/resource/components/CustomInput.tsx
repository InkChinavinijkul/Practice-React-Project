const CustomInput = (props: React.ComponentPropsWithoutRef<"input">) => {
  return (
    <input
      {...props}
      style={{
        backgroundColor: "white",
        color: "black",
        border: "1px solid gray",
        borderRadius: "20px",
        padding: "5px 10px",
        margin: "0px 5px"
      }}
    />
  )
}

export default CustomInput
