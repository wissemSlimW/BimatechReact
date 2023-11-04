import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { routes } from './config/routes'
import { EmployeesList } from './pages/Employees/Employees'
import { EmployeesCRU } from './pages/Employees/EmployeesCRU'
import { SkillsList } from './pages/Skills/Skills'
import { SkillsCRU } from './pages/Skills/SkillsCRU'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home'


const App = () => {

  return (
    <div style={{ width: "100%", height: '100%' }}>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <Routes>
            <Route path={`${routes.employees}`} element={<EmployeesList />} />
            <Route path={`${routes.employees}/:id`} element={<EmployeesCRU />} />
            <Route path={`${routes.employeesAdd}`} element={<EmployeesCRU />} />
            <Route path={`${routes.employeesView}/:id`} element={<EmployeesCRU />} />

            <Route path={`${routes.skills}`} element={<SkillsList />} />
            <Route path={`${routes.skills}/:id`} element={<SkillsCRU />} />
            <Route path={`${routes.skillsAdd}`} element={<SkillsCRU />} />
            <Route path={`${routes.skillsView}/:id`} element={<SkillsCRU />} />

            <Route path={`/`} element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
