import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComingSoon from './components/ComingSoon';
import Slider from './components/Slider';

function App() {
  return (
    <>
      <Slider />
      <ComingSoon />
      <ToastContainer />
    </>
  );
}

export default App;
