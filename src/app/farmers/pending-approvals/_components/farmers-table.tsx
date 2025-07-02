import { formatDate } from "@/lib/utils";
import { Farmer } from "../types";

interface FarmersTableProps {
  farmers: Farmer[];
  onViewDetails: (farmerId: number) => void;
}

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
    {children}
  </th>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="dark:border-strokedark border-b border-[#eee] px-4 py-5">
    {children}
  </td>
);

export const FarmersTable = ({ farmers, onViewDetails }: FarmersTableProps) => {
  return (
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
                  onClick={() => onViewDetails(farmer.id)}
                >
                  View Details
                </button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 