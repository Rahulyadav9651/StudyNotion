import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from "../components/common/Sidebar"
import { ImSpinner9 } from "react-icons/im";

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );

    if(profileLoading || authLoading) {
        return (
            <div className='flex items-center justify-center mt-10'>
                <ImSpinner9 className='animate-spin text-4xl'/>
            </div>
        )
    }

  return (
    <div className='flex min-h-[calc(100vh-3.5rem)] bg-richblack-400'>
        <Sidebar />
        <div className='flex-1 overflow-y-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard