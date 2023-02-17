import Link from 'next/link'
import Login from './Login'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import Logged from './Logged'

export default async function Nav() {
    const session = await getServerSession(authOptions)
    return (
        <nav className='flex justify-between items-center py-8'>
            <Link href={'/'}>
                <h1 className='font-bold text-lg'>Send It.</h1>
            </Link>
            <ul className='flex items-center gap-6'> 
                {!session?.user && <Login/>}
                {session?.user &&
                <div className='flex gap-5 items-center'>
                    <h2>Bem-vindo(a) {session.user.name}</h2>
                    <Logged image={session.user?.image || ""}/>
                </div>}
            </ul>
        </nav>
    )
}