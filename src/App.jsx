import { Fragment, Suspense, lazy } from "react";
import "./App.css";
import AuthProvider from "./auth/AuthProvider";
import Loading from "./components/Loading";
import Perfil from "./components/Perfil";
// const AppRouter = lazy(() => import("./routers/AppRouter"));
const Modal = lazy(() => import("./components/Modal"));

function App() {
  return (
    <Fragment>
      <AuthProvider>
        {/* <Suspense fallback={<Loading />}> */}
          <Perfil />
        {/* </Suspense> */}
      </AuthProvider>
    </Fragment>
  );
}

export default App;
