import { Fragment, Suspense, lazy } from "react";
import "./App.css";
import AuthProvider from "./auth/AuthProvider";
import Loading from "./components/Loading";
const AppRouter = lazy(() => import("./routers/AppRouter"));

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <AppRouter />
        </Suspense>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
