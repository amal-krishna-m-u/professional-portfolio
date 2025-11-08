import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, TestPage, ComponentShowcase, NotFound } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main portfolio page */}
        <Route path="/" element={<Home />} />
        
        {/* Test page for development */}
        <Route path="/test" element={<TestPage />} />
        
        {/* Component showcase */}
        <Route path="/components" element={<ComponentShowcase />} />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
