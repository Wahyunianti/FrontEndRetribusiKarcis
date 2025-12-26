import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import Home from "./Home"
import JenisKarcis from "./JenisKarcis"
import Retribusi from "./Retribusi"
import Pengelola from "./Pengelola"

function DashboardPage() {
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

export default DashboardPage