import logo from './logo.svg';
import './App.css';
import Banner from './Banner';
import Slide from './Slide';
import Features from './Features';
import Steps from './Steps';
import Resume from './Resume';
import Review from './Review';
import Blog from './Blog';
import Footer from './Footer';
import Header from './Header';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import RegisterForm from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
import ResumeMaker from './ResumeMaker';
import ResumeEditer from './ResumeEditer';
import BlogMain from './BlogMain';

import FAQ from './FAQ';
import { Provider } from 'react-redux';
import store from './store';
import Infogather from './infogather';
//ijijij
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Provider store={store}>

            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Dashboard />} />
                    <Route path="/ResumeMaker" element={<ResumeMaker />} />
                    <Route path="/infogather" element={<Infogather />} />
                    <Route path="/ResumeEditer" element={<ResumeEditer />} />
                   
                    <Route path="/Blog" element={<BlogMain />} />
                    <Route path="/FAQ" element={<FAQ />} />
            </Routes>
          </Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
