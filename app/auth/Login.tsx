'use client'

import {signIn} from 'next-auth/react'

export default function Login(){
    return(
        <li className='list-none'>
            <button
            onClick={() => signIn()}
            className='text-sm py-2 px-6 rounded-lg bg-gray-700 text-white
            disabled:opacity-50 hover:bg-gray-600'>
                Entrar
            </button>
        </li>
    )
}