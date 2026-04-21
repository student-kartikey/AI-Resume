import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const user = { name: "John Doe" }
    const logoutUser = () => {
        navigate('/')
    }

    return (
        <div className="w-full bg-white shadow">
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-6 py-3.5 text-slate-800'>
                
                <Link to='/' className="flex items-center">
                    <img src="/logo.svg" alt="logo" className='h-11 w-auto'/>
                </Link>

                <div className='flex items-center gap-6 text-sm'>
                    <p className='max-sm:hidden font-medium'>Hi, {user?.name}</p>
                    <button 
                        onClick={logoutUser} 
                        className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'
                    >
                        Logout
                    </button>
                </div>

            </nav>
        </div>
    )
}

export default Navbar