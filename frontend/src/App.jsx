
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import Contact from './pages/Contact'
import Market from './pages/Market'
import { Footer, Navbar } from './components/index';
import { ThemeProvider } from '../src/ThemeContext';
import UserDashboard from './pages/UserDashboard';
import { AppStateProvider } from './lib/AppStateManager';
import { AuthProvider } from './lib/AuthContext';
import UserProfile from './pages/UserProfile';

import PrivateRoute from './utils/PrivateRoute'

function App() {

  return ( 
    
    <div className='App'>
        <AppStateProvider>
            <AuthProvider>
                <ThemeProvider>
                    <Router>   
                        <Navbar />
                        <PrivateRoute path='/UserDashboard/' exact element={<UserDashboard />} />
                        <PrivateRoute path='/UserProfile' exact element={<UserProfile />} />
                        <Routes>
                            <Route path='/' exact element={<Home />} />
                            <Route path='/market'  exact element = {<Market />}/>
                            <Route path='/contact' exact element={<Contact />} />
                            <Route path='/UserDashboard/:section' exact element={<UserDashboard />} />

                        </Routes>
                        <Footer/>
                    </Router>
                </ThemeProvider>
            </AuthProvider>
        </AppStateProvider>
    </div>
    
);
}

export default App;
