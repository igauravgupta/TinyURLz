import { Outlet } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import { login } from './store/slice/AuthSlice.js';
import { getCurrentUser } from './features/auth/services/auth.api';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        // On mount, check if user is authenticated (session/cookie)
        getCurrentUser()
            .then(res => {
                if (res.user) {
                    dispatch(login(res.user));
                }
            })
            .catch(() => {});
    }, [dispatch]);
    return (
       <>
       <Navbar/>
       <Outlet />
       <Footer/>
       </>
    );
}

export default App;