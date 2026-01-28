import { Route, Routes } from 'react-router-dom'

import Footer from './components/Footer.tsx'
import Homepage from './pages/Homepage'
import NavBar from './components/Navbar.tsx'
import Tiktok from './pages/Tiktok.tsx'
import Youtube from './pages/Youtube.tsx'

const fonts = {
  robotoSlab: {
      fontFamily: 'Roboto Slab'
  },
  margarine: {
      fontFamily: 'Margarine'
  },
  story: {
      fontFamily: 'Story Script'
  },
  chewy: {
      fontFamily: 'Chewy'
  },
  walter: {
      fontFamily: 'Walter Turncoat'
  },

}

export default function App() {
  
  return (
      <div className="min-h-screen flex flex-col">
        <NavBar  fonts={fonts} />
        <div className="grow">
          <Routes>
            <Route path="/" element={<Homepage  fonts={fonts} />} />
            <Route path="/youtube" element={<Youtube fonts={fonts} />} />
            <Route path="/tiktok" element={<Tiktok />} />
          </Routes>
        </div>
        <Footer />
      </div>

  ) 
}

