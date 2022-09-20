import { Fragment } from 'react';
import './App.css';
import AuthProvider from './auth/AuthProvider';
import Footer from './components/Footer';
import AppRouter from './routers/AppRouter';

function App() {
  return (

    <Fragment> 
      <AuthProvider>
        <AppRouter />
        <Footer />
      </AuthProvider>
    </Fragment>
    
  );
}

export default App;
