import Navbar from './page/layout/Navbar'
import Footer from './page/layout/Footer'
import Home from './page/dashboard/Home'
import JenisKarcis from './page/dashboard/JenisKarcis'
import Retribusi from './page/dashboard/Retribusi'
import Pengelola from './page/dashboard/Pengelola'

function App() {
  return (
    <>
    <div className='w-screen backgroundTile overflow-x-hidden relative min-h-screen h-min'>
        <Navbar />
        <div className='absolute top-0 -left-7 z-12 rotate-6'>
          <img src="daun.gif" width={600} alt="" />
        </div>
        <main className='min-h-screen h-min pt-20 w-screen relative'>
          <div className='w-full h-min p-10 z-20 relative'>
            <Home />
            <JenisKarcis />
            <Retribusi />
            <Pengelola />
          </div>
</main>
        <Footer />
    </div>
    </>
  )
}

export default App
