import "./App.css";
import Routers from "./Routes/Router";
import { AuthProvider } from "./Pages/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <Routers />
    </AuthProvider>
    </>
  );
}

export default App;
