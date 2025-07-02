'use client';

import { useEffect, useState } from 'react';

interface DashboardStats {
  totalFarmers: number;
  pendingApprovals: number;
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFarmers: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/auth/pending-farmers');
        const farmers = await response.json();
        setStats(prev => ({
          ...prev,
          pendingApprovals: farmers.length
        }));
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
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
                {stats.pendingApprovals}
              </h4>
              <span className="text-sm font-medium">Pending Approvals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 