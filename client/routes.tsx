import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Layout from './components/Layout.tsx'
import TablePage from './components/TablePage.tsx'
export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/table" element={<TablePage />} />
    <Route path="/table/:search" element={<TablePage />} />
  </Route>,
)
