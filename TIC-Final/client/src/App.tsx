import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Users from './routes/admin/Users';
import Products from './routes/admin/Products';
import Suppliers from './routes/admin/Suppliers';
import TypeProducts from './routes/admin/TypeProducts';
import Measures from './routes/admin/Measures';
import Login from './routes/login';
import SuppplierProduct from './routes/admin/SupplierProduct';
import TypeMovements from './routes/admin/typeMovements';
import ProductMovement from './routes/admin/ProductMovement';
import CostCenter from './routes/admin/CostCenter';
import RevenueSource from './routes/admin/RevenueSource';
import ChartOfAccount from './routes/admin/ChartOfAccounts';
import FinantialMovement from './routes/admin/FinantialMovement';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/typeproduct" element={<TypeProducts />} />
        <Route path="/measure" element={<Measures />} />
        <Route path="/login" element={<Login />} />
        <Route path="/association" element={<SuppplierProduct />} />
        <Route path="/typemovement" element={<TypeMovements />} />
        <Route path="/movementProduct" element={<ProductMovement />} />
        <Route path="/costCenter" element={<CostCenter />} />
        <Route path="/revenueSource" element={<RevenueSource/>} />
        <Route path="/chartofaccounts" element={<ChartOfAccount/>} />
        <Route path="/movementFinantial" element={<FinantialMovement />} />







        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}



export default App
