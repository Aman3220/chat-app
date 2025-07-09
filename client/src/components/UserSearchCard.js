import React from 'react'
import Avatar from './Avatar'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const UserSearchCard = ({user, onClose}) => {
  const loggedInUser = useSelector((state) => state.user?.data);
  console.log(loggedInUser)
  const displayName = user?._id === loggedInUser?._id ? 'You' : user?.name;
  console.log(displayName)
  return (
    <Link to={"/"+user?._id} onClick={onClose} className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer'>
        <div>
            <Avatar
                width={50}
                height={50}
                name={user?.name}
                userId={user?._id}
                imageUrl={user?.profile_pic}
            />
        </div>
        <div>
            <div className='font-semibold text-ellipsis line-clamp-1'>
                {displayName}
            </div>
            <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
        </div>
    </Link>
  )
}

export default UserSearchCard
