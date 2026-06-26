import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex w-full h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-10 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}