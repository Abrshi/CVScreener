
import Link from 'next/link'
import React from 'react'
import Hheader from './components/Hheader'

function page() {



  return (
    <div>
      {/* <Hheader /> */}
<div className='h-20 flex items-center justify-center text-white font-bold text-2xl px-20  border-b  bg-gray-700'>
            <div className=' flex-1 '>
                <p>Admin Page</p>
            </div>
            <div className='flex-2 '>
                <p>Top 50</p>
            </div>
        </div>

        <div>
            <div className="overflow-x-auto width mx-20 mt-10 p-5 rounded-2xl bg-gray-700">
 <table className="w-full ">
   
    <thead className="">
      <tr className='border-b border-gray-400'>
        <th className="px-4 py-2 text-left ">Runk</th>
        <th className="px-4 py-2 text-left ">Name</th>
        <th className="px-4 py-2 text-left ">Detail</th>
      </tr>
    </thead>

    <tbody>
   <tr class="border-b border-gray-400">
        <td class="px-4 py-2 ">1</td>
        <td class="px-4 py-2 ">Abreham</td>
        <td class="px-4 py-2 ">

            <div className='w-25 h-10 bg-amber-500 rounded-2xl p-2'>
                <Link href="/admin/detail/1">View Detail</Link>
            </div>
        </td>
      </tr>
     <tr class="border-b border-gray-400">
        <td class="px-4 py-2 ">1</td>
        <td class="px-4 py-2 ">Abreham</td>
        <td class="px-4 py-2 ">

            <div className='w-25 h-10 bg-amber-500 rounded-2xl p-2'>
                <Link href="/admin/detail/2">View Detail</Link>
            </div>
        </td>
      </tr>
      <tr class="border-b border-gray-400">
        <td class="px-4 py-2 ">1</td>
        <td class="px-4 py-2 ">Abreham</td>
        <td class="px-4 py-2 ">

            <div className='w-25 h-10 bg-amber-500 rounded-2xl p-2'>
                <Link href="/admin/detail/3">View Detail</Link>
            </div>
        </td>
      </tr> 
    </tbody>
           </table>
           </div>

        </div>

    </div>
  )
}

export default page