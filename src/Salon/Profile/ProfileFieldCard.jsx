import { Divider } from '@mui/material'
import React from 'react'

const ProfileFieldCard = ({value,keys}) => {
  return (
    <div className='p-5 flex items-center bg-slate-500'>
        <p className='w-20 lg:w-36 pr-5 text-white'>{keys}</p>
        <Divider className='pl-2' flexItem orientation='vertical'/>
        <p className='text-white pl-4 lg:pl-10 font-semibold lg:text-lg'>{value}</p>
    </div>
  )
}

export default ProfileFieldCard