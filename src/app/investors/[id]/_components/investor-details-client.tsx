"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

interface InvestorDetails {
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
    <span className="font-semibold text-gray-700 dark:text-gray-300">
      {label}:
    </span>{" "}
    <span className="text-gray-900 dark:text-white">{value}</span>
  </div>
);

const ImagePreview = ({ src, alt }: { src: string; alt: string }) => (
  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
      <span className="font-medium text-gray-700 dark:text-gray-300">
        {alt}
      </span>
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

const InvestorDetailsClient = ({ investorId }: { investorId: string }) => {
  const router = useRouter();
  const [investor, setInvestor] = useState<InvestorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<
    "approve" | "reject" | null
  >(null);

  const fetchInvestorDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/auth/investor/${investorId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      setInvestor(data);
    } catch (error) {
      console.error("Error fetching investor details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestorDetails();
  }, [investorId]);

  const handleApprove = async () => {
    try {
      setActionLoading("approve");
      const response = await fetch(
        `http://localhost:4000/api/auth/investor/${investorId}/approve`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      // Success - redirect to pending approvals
      router.push("/investors/pending-approvals");
    } catch (error) {
      console.error("Error approving investor:", error);
      alert(`Failed to approve investor: ${error.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading("reject");
      const response = await fetch(
        `http://localhost:4000/api/auth/investor/${investorId}/reject`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      // Success - redirect to pending approvals
      router.push("/investors/pending-approvals");
    } catch (error) {
      console.error("Error rejecting investor:", error);
      alert(`Failed to reject investor: ${error.message}`);
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

  if (!investor) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-danger text-lg">Investor not found</div>
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
          Investor Details
        </h1>
      </div>

      <div className="dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke bg-white shadow-default">
        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h3>
              <DetailRow
                label="Name"
                value={`${investor.first_name} ${investor.last_name}`}
              />
              <DetailRow label="Phone" value={investor.phone} />
              <DetailRow label="Email" value={investor.email} />
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Account Status
              </h3>
              <DetailRow
                label="Phone Verification"
                value={
                  <span
                    className={
                      investor.is_phone_verified
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {investor.is_phone_verified ? "Verified" : "Not Verified"}
                  </span>
                }
              />
              <DetailRow
                label="Registration Date"
                value={formatDate(investor.created_at)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Identity Documents
            </h3>
            <div className="space-y-4">
              <ImagePreview src={investor.nid_front} alt="NID Front" />
              <ImagePreview src={investor.nid_back} alt="NID Back" />
            </div>
          </div>
        </div>
      </div>

      <div className="dark:border-strokedark dark:bg-boxdark rounded-sm border border-stroke bg-white p-6 shadow-default">
        <div className="flex flex-col justify-end gap-4 sm:flex-row">
          <button
            onClick={handleReject}
            disabled={!!actionLoading}
            className={`flex items-center justify-center rounded-lg bg-red-500 px-6 py-3 font-medium ${
              actionLoading === "reject"
                ? "cursor-not-allowed bg-red-400"
                : "hover:bg-red-600"
            } order-1 w-full text-white transition-colors sm:order-none sm:w-auto`}
          >
            {actionLoading === "reject" ? (
              <>
                <span className="mr-2">Rejecting</span>
                <span className="animate-pulse">...</span>
              </>
            ) : (
              "Reject Application"
            )}
          </button>
          <button
            onClick={handleApprove}
            disabled={!!actionLoading}
            className={`flex items-center justify-center rounded-lg bg-green-500 px-6 py-3 font-medium ${
              actionLoading === "approve"
                ? "cursor-not-allowed bg-green-400"
                : "hover:bg-green-600"
            } order-2 w-full text-white transition-colors sm:order-none sm:w-auto`}
          >
            {actionLoading === "approve" ? (
              <>
                <span className="mr-2">Approving</span>
                <span className="animate-pulse">...</span>
              </>
            ) : (
              "Approve Application"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestorDetailsClient;
