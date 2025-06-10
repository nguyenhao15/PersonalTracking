import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expenses from "./pages/Dashboard/Expenses";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import Wallet from "./pages/Dashboard/Wallet";


const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div >
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            {/* Nếu đang ở / hoặc bất kỳ route nào khác => chuyển về /login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path='/' element={!user ? <LoginPage /> : <Navigate to='/dashboard' />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/dashboard' />} />
            <Route path="/dashboard" exact element={<Home />}></Route>
            <Route path="/income" exact element={<Income />}></Route>
            <Route path="/wallets" exact element={<Wallet />}></Route>
            <Route path="/expenses" exact element={<Expenses />}></Route>
          </>
        )}
      </Routes>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '12px'
          },
        }}
      />
    </div>
  )
}

export default App;

