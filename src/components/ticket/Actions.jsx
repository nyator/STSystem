import React from 'react'
import { LuTrash2, LuPencil } from 'react-icons/lu'

const EditAction = () => {
    return (
        <div className="text-blue-500 bg-blue-50 hover:bg-blue-200 p-1.5 rounded-md transition-all ease-in-out duration-300">
            <LuPencil size={15} />
            <span className=" hidden group-hover:flex">Edit</span>
        </div>
    )
}

const DeleteAction = () => {
    return (
        <div className="text-red-500 bg-red-50 hover:bg-red-200 p-1.5 rounded-md transition-all ease-in-out duration-300">
            <LuTrash2 size={15} />
        </div>
    )
}

export default function Actions() {
    return (
        <div className='flex gap-2'>
            <EditAction />
            <DeleteAction />
        </div>
    )
}