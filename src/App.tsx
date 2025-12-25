import Navbar from './page/layout/Navbar'
import Footer from './page/layout/Footer'
import Home from './page/dashboard/Home'
import JenisKarcis from './page/dashboard/JenisKarcis'
import Retribusi from './page/dashboard/Retribusi'
import Pengelola from './page/dashboard/Pengelola'

function App() {
  return (
    <>
      <div className='w-screen h-min min-h-screen relative'>
        <Navbar />
        <div className='absolute top-0 -left-7 z-12 rotate-6'>
          <img src="daun.gif" width={600} alt="" />
        </div>
        <main className='min-h-screen h-min pt-20 w-screen bg-linear-to-br from-white to-lime-100 relative'>
          <div className='w-full h-min p-10 z-20 relative'>
            <Home />
            <JenisKarcis />
            <Retribusi />
            <Pengelola />
          </div>
          <div className='backgroundTile w-screen h-full absolute top-0 bottom-0 left-0 right-0 z-1'></div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
