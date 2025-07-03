'use client';

import { useEffect, useState } from 'react';

interface DashboardStats {
  totalFarmers: number;
  pendingFarmersApprovals: number;
  pendingInvestorsApprovals: number;
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFarmers: 0,
    pendingFarmersApprovals: 0,
    pendingInvestorsApprovals: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch pending farmers
        const farmersResponse = await fetch(
          "http://localhost:4000/api/auth/pending-farmers",
        );
        const farmers = await farmersResponse.json();

        // Fetch pending investors
        const investorsResponse = await fetch(
          "http://localhost:4000/api/auth/pending-investors",
        );
        const investors = await investorsResponse.json();

        setStats((prev) => ({
          ...prev,
          pendingFarmersApprovals: Array.isArray(farmers) ? farmers.length : 0,
          pendingInvestorsApprovals: Array.isArray(investors)
            ? investors.length
            : 0,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Pending Farmers Approval Card */}
        <div className="dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default">
          <div className="bg-meta-2 dark:bg-meta-4 flex h-11.5 w-11.5 items-center justify-center rounded-full">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 9.62499C14.0375 9.62499 16.5 7.16249 16.5 4.12499C16.5 1.08749 14.0375 -1.37501 11 -1.37501C7.9625 -1.37501 5.5 1.08749 5.5 4.12499C5.5 7.16249 7.9625 9.62499 11 9.62499ZM11 12C7.15 12 -0.5 13.9375 -0.5 17.7875V19.25C-0.5 20.0375 0.0625 20.625 0.875 20.625H21.125C21.9375 20.625 22.5 20.0375 22.5 19.25V17.7875C22.5 13.9375 14.85 12 11 12Z"
                fill=""
              />
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {stats.pendingFarmersApprovals}
              </h4>
              <span className="text-sm font-medium">Pending Farmers Approval</span>
            </div>
          </div>
        </div>

        {/* Pending Investors Approval Card */}
        <div className="dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default">
          <div className="bg-meta-3 dark:bg-meta-4 flex h-11.5 w-11.5 items-center justify-center rounded-full">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1749 3.96874C16.1749 6.33437 14.2312 8.27812 11.8656 8.27812C9.49995 8.27812 7.55620 6.33437 7.55620 3.96874C7.55620 1.60312 9.49995 -0.340626 11.8656 -0.340626C14.2312 -0.340626 16.1749 1.60312 16.1749 3.96874ZM4.53121 9.64062C3.78433 9.64062 3.16245 10.2625 3.16245 11.0094C3.16245 11.7562 3.78433 12.3781 4.53121 12.3781C5.27808 12.3781 5.89996 11.7562 5.89996 11.0094C5.89996 10.2625 5.27808 9.64062 4.53121 9.64062ZM19.2 9.64062C18.4531 9.64062 17.8312 10.2625 17.8312 11.0094C17.8312 11.7562 18.4531 12.3781 19.2 12.3781C19.9469 12.3781 20.5687 11.7562 20.5687 11.0094C20.5687 10.2625 19.9469 9.64062 19.2 9.64062ZM11.8656 10.0156C15.2062 10.0156 21.9999 11.7219 21.9999 15.0625V17.875C21.9999 18.6219 21.3781 19.2437 20.6312 19.2437H3.09996C2.35308 19.2437 1.73121 18.6219 1.73121 17.875V15.0625C1.73121 11.7219 8.52496 10.0156 11.8656 10.0156Z"
                fill=""
              />
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {stats.pendingInvestorsApprovals}
              </h4>
              <span className="text-sm font-medium">Pending Investors Approval</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 