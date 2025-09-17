import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainAdminDashboardContainer from './components/layout/MainAdminDashboardContainer.tsx';
import Signup from './pages/Signup.tsx';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
<link href="/src/style.css" rel="stylesheet"></link>
function App() {

  return (
    <>
      <Loader />
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path='/dashboard/*' element={<MainAdminDashboardContainer />} />
          <Route path='/*' element={<MainAdminDashboardContainer />} />
          <Route path='/signup/*' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App