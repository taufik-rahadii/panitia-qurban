const Centered = ({children}) => {
  return <div className="h-screen md:w-screen sm:w-10/12 flex justify-center items-center">
    {children}
  </div>
}

export default Centered
