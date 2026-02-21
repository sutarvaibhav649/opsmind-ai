import Navbar from "./Navbar";
import MainLayout from "./MainLayout";

function App() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <MainLayout />
    </div>
  );
}

export default App;
