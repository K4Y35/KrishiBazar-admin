'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

interface FarmerDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_phone_verified: boolean;
  created_at: string;
  nid_front: string;
  nid_back: string;
}

interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="mb-4">
    <span className="font-semibold text-gray-700 dark:text-gray-300">{label}:</span>{" "}
    <span className="text-gray-900 dark:text-white">{value}</span>
  </div>
);

const ImagePreview = ({ src, alt }: { src: string; alt: string }) => (
  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <span className="font-medium text-gray-700 dark:text-gray-300">{alt}</span>
    </div>
    <div className="relative h-[200px] w-full">
      <Image
        src={`http://localhost:4000/uploads/${src}`}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  </div>
);

const FarmerDetailsClient = ({ farmerId }: { farmerId: string }) => {
  const router = useRouter();
  const [farmer, setFarmer] = useState<FarmerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<'approve' | 'reject' | null>(null);

  const fetchFarmerDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/auth/farmer/${farmerId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFarmer(data);
    } catch (error) {
      console.error("Error fetching farmer details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerDetails();
  }, [farmerId]);

  const handleApprove = async () => {
    try {
      setActionLoading('approve');
      const response = await fetch(`http://localhost:4000/api/auth/farmer/${farmerId}/approve`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      // Success - redirect to pending approvals
      router.push('/farmers/pending-approvals');
    } catch (error) {
      console.error("Error approving farmer:", error);
      alert(`Failed to approve farmer: ${error.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading('reject');
      const response = await fetch(`http://localhost:4000/api/auth/farmer/${farmerId}/reject`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      // Success - redirect to pending approvals
      router.push('/farmers/pending-approvals');
    } catch (error) {
      console.error("Error rejecting farmer:", error);
      alert(`Failed to reject farmer: ${error.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-danger">Farmer not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <button
          onClick={() => router.back()}
          className="mb-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ← Back to Pending Approvals
        </button>
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Farmer Details
        </h1>
      </div>

      <div className="dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke bg-white shadow-default">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="space-y-2">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Personal Information</h3>
              <DetailRow
                label="Name"
                value={`${farmer.first_name} ${farmer.last_name}`}
              />
              <DetailRow label="Phone" value={farmer.phone} />
              <DetailRow label="Email" value={farmer.email} />
            </div>

            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Account Status</h3>
              <DetailRow
                label="Phone Verification"
                value={
                  <span className={farmer.is_phone_verified ? "text-success" : "text-danger"}>
                    {farmer.is_phone_verified ? "Verified" : "Not Verified"}
                  </span>
                }
              />
              <DetailRow
                label="Registration Date"
                value={formatDate(farmer.created_at)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Identity Documents</h3>
            <div className="space-y-4">
              <ImagePreview src={farmer.nid_front} alt="NID Front" />
              <ImagePreview src={farmer.nid_back} alt="NID Back" />
            </div>
          </div>
        </div>
      </div>

      <div className="dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke bg-white shadow-default p-6">
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={handleReject}
            disabled={!!actionLoading}
            className={`flex items-center bg-red-500 justify-center px-6 py-3 rounded-lg font-medium ${
              actionLoading === 'reject'
                ? 'bg-red-400 cursor-not-allowed'
                : 'hover:bg-red-600'
            } text-white transition-colors w-full sm:w-auto order-1 sm:order-none`}
          >
            {actionLoading === 'reject' ? (
              <>
                <span className="mr-2">Rejecting</span>
                <span className="animate-pulse">...</span>
              </>
            ) : (
              'Reject Application'
            )}
          </button>
          <button
            onClick={handleApprove}
            disabled={!!actionLoading}
            className={`flex items-center bg-green-500 justify-center px-6 py-3 rounded-lg font-medium ${
              actionLoading === 'approve'
                ? 'bg-green-400 cursor-not-allowed'
                : 'hover:bg-green-600'
            } text-white transition-colors w-full sm:w-auto order-2 sm:order-none`}
          >
            {actionLoading === 'approve' ? (
              <>
                <span className="mr-2">Approving</span>
                <span className="animate-pulse">...</span>
              </>
            ) : (
              'Approve Application'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetailsClient; 