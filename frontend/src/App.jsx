
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import Contact from './pages/Contact'
import Market from './pages/Market'
import { Footer, Navbar } from './components/index';
import { ThemeProvider } from '../src/ThemeContext';
import UserDashboard from './pages/UserDashboard';
import { AppStateProvider } from './lib/AppStateManager';
import UserProfile from './pages/UserProfile';

function App() {

  return ( 
    
    <div className='App'>
        <AppStateProvider>
            <ThemeProvider>
                <Router>   
                    <Navbar />        
                    <Routes>
                        <Route path='/' exact element={<Home />} />
                        <Route path='/UserProfile' exact element={<UserProfile />} />
                        <Route path='/market'  exact element = {<Market />}/>
                        <Route path='/contact' exact element={<Contact />} />
                        <Route path='/UserDashboard/' exact element={<UserDashboard />} />
                        <Route path='/UserDashboard/:section' exact element={<UserDashboard />} />
                    </Routes>
                    <Footer/>
                </Router>
            </ThemeProvider>
        </AppStateProvider>
    </div>
    
);
}

export default App;
