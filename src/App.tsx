import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { FirstDataTable } from './components/FirstDataTable/FirstDataTable'
import { Form } from './components/Form/Form'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Form />} />
          <Route path='/DataTable' element={<FirstDataTable />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
