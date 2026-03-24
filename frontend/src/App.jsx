import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import PeopleList from './PeopleList';

function App() {
  return (
    <Router>
      <nav style={{ padding: '20px', textAlign: 'center', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Kayıt Ol</Link>
        <Link to="/people">Listeyi Gör</Link>
      </nav>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/people" element={<PeopleList />} />
      </Routes>
    </Router>
  );
}
export default App;