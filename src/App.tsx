import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainAdminDashboardContainer from './components/MainAdminDashboardContainer.tsx';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
<link href="/src/style.css" rel="stylesheet"></link>
function App() {

  return (
    <>
      <Loader />
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path='/*' element={<MainAdminDashboardContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App