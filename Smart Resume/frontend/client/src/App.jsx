import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import SuggestionForm from './pages/SuggestionForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
        < Route path="/suggestions" element={<SuggestionForm />} />
      </Routes>
    </Router>
  );
}
