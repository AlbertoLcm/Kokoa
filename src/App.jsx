import { Fragment } from 'react';
import './App.css';
import Footer from './components/Footer';
import AppRouter from './routers/AppRouter';

function App() {
  return (

    <Fragment> 
      <AppRouter />
      <Footer />
    </Fragment>
    
  );
}

export default App;
