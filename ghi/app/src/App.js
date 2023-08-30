import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ShoeList from './ShoeList';
import ShoeForm from './ShoeForm'
import Nav from './Nav';
import HatList from './HatList';
import CreateHatForm from './HatForm';

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatList/>} />
          <Route path="/hats/new" element={<CreateHatForm/>} />
        </Routes>
        <Routes path="/">
          <Route path="shoes" element={<ShoeList />} />
          <Route path="/shoes/new" element={<ShoeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
