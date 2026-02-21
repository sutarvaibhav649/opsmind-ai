import Sidebar from "../components/sidebar/Sidebar";
import FilesPanel from "../components/chat/FilesPanel";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="grid grid-cols-12 h-screen bg-[#0F172A] text-gray-100">
        <div className="col-span-2 border-r border-gray-700">
            <Sidebar />
        </div>

        <div className="col-span-8">
            <Outlet />
        </div>

        <div className="col-span-2 border-l border-gray-700">
            <FilesPanel />
        </div>
        </div>
    );
}

export default AppLayout;