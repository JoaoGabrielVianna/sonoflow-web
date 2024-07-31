import { Link } from 'react-router-dom'
import ManHome from '../assets/svgs/man-home.svg'
import useProvideAuth from '../hooks/useProvideAuth'

export default function Home() {
  const auth = useProvideAuth()

  return (
    <div className="flex-1 h-screen flex items-end bg-[#0F1A3B]">
      <div className='w-full h-full bg-home-background bg-contain bg-no-repeat fixed'></div>
      <main className='w-full h-[77%] px-6 py-10 space-y-10  rounded-t-3xl bg-pale-blue overflow-hidden z-0'>
        {/* Header */}
        <header className='flex gap-2'>
          <img src={auth.infoUser?.pictureUrl} alt="" className='size-16 rounded-xl' />
          <div>
            <h1 className='font-medium text-deep-blue'>Olá, {auth.infoUser?.username}</h1>
            <p className='text-slate font-medium text-sm'>Bem vindo ao seu diario do sono</p>
          </div>
        </header>

        {/* Diario do Sono */}
        <section className='w-full space-y-4'>
          <h1 className='text-deep-blue text-lg'>Diario do sono</h1>
          <div className='  h-50 p-4 flex rounded-3xl relative bg-blue-gradient'>
            <div className='w-1/2 flex flex-col  gap-4'>
              <h1 className='text-white text-xl'>Já realizou o seu <strong>diario do sono</strong> hoje?</h1>

              <Link to={'/diary'}><button className='w-full bg-sunshine py-2 rounded-2xl'>Responder</button></Link>
            </div>
            <img src={ManHome} alt="" className='absolute right-0 bottom-0 translate-x-10 translate-y-2' />
          </div>
        </section>
      </main>
    </div>
  )
}
