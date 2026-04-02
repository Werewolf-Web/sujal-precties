import RegisterForm from "./component/RegisterForm"


const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-blue-50/50 via-white to-indigo-50/50 relative overflow-hidden">
        {/* Animated Background Decor */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-400 blur-[100px] opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-400 blur-[100px] opacity-20 animate-pulse" />
        
        <RegisterForm/>
    </div>
  )
}

export default RegisterPage