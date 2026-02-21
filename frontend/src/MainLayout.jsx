import Leftbar from "./Components/Leftbar";
import Middlebar from "./Components/Middlebar";
import Rightbar from "./Components/Rightbar";


const MainLayout = () => {
  return (
    <div className="flex flex-1">
      <div className="w-64 bg-blue-200 p-4">
        <Leftbar />
      </div>

      <div className="flex flex-1 bg-blue-300 p-4">
       <Middlebar />
      </div>

      <div className="w-64 bg-blue-400 p-4">
         <Rightbar />
      </div>
    </div>
  );
};

export default MainLayout;
