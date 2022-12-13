import React, { Fragment, Suspense, lazy } from "react";
import "./App.css";
import AuthProvider from "./auth/AuthProvider";
import Loading from "./components/loadings/Loading";
import DasBoard from "./pages/dashboard/DashBoard";
const AppRouter = lazy(() => import("./routers/AppRouter"));

function App() {
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <AppRouter />
          {/* <DasBoard /> */}
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
