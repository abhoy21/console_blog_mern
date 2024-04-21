import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
import DashboardPost from "../components/DashboardPost";
import DashboardUsers from "../components/DashboardUsers";
import DashboardComments from "../components/DashboardComments";
import DashboardComp from "../components/DashboardComp";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
      console.log(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex justify-center flex-col md:flex-row'>
      {/* Sidebar */}
      <div className='order-last md:order-first py-4'>
        <DashboardSidebar />
      </div>

      {/* Profile */}
      <div className='md:w-3/4'>
        <div className='order-first md:order-last'>
          {tab === "profile" && <DashboardProfile />}
          {tab === "posts" && <DashboardPost />}
          {tab === "users" && <DashboardUsers />}
          {tab === "comments" && <DashboardComments />}
          {tab === "dash" && <DashboardComp />}
        </div>
      </div>
    </div>
  );
}
