"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Farmer } from "./types";
import { formatDate } from "@/lib/utils";

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps) => (
  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
    {children}
  </th>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="dark:border-strokedark border-b border-[#eee] px-4 py-5">
    {children}
  </td>
);

const PendingApprovals = () => {
  const router = useRouter();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingFarmers = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/pending-farmers",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        setFarmers(data);
      } else if (data.farmers && Array.isArray(data.farmers)) {
        setFarmers(data.farmers);
      } else {
        console.error("Unexpected data format:", data);
        setFarmers([]);
      }
    } catch (error) {
      console.error("Error fetching pending farmers:", error);
      setFarmers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingFarmers();
  }, []);

  const handleViewDetails = (farmerId: number) => {
    router.push(`/farmers/${farmerId}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Pending Farmer Approvals
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {farmers.length} pending requests
        </div>
      </div>

      <div className="dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="dark:bg-meta-4 bg-gray-2 text-left">
                <TableHeader>Name</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Registration Date</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer, index) => (
                <tr
                  key={farmer.id}
                  className={
                    index % 2 === 0 
                      ? "dark:bg-meta-4/30 bg-gray-50 hover:bg-gray-100 dark:hover:bg-meta-4/40 transition-colors" 
                      : "hover:bg-gray-100 dark:hover:bg-meta-4/10 transition-colors"
                  }
                >
                  <TableCell>
                    <span className="font-medium">
                      {farmer.first_name} {farmer.last_name}
                    </span>
                  </TableCell>
                  <TableCell>{farmer.phone}</TableCell>
                  <TableCell>{farmer.email}</TableCell>
                  <TableCell>{formatDate(farmer.created_at)}</TableCell>
                  <TableCell>
                    <button
                      className="text-primary hover:text-primary/80 hover:underline transition-colors"
                      onClick={() => handleViewDetails(farmer.id)}
                    >
                      View Details
                    </button>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;
