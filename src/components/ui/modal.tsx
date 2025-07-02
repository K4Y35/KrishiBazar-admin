import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions?: {
    label: string;
    onClick: () => void;
    variant: "primary" | "danger" | "success" | "secondary";
  }[];
}

const Modal = ({ isOpen, title, onClose, children, actions = [] }: ModalProps) => {
  if (!isOpen) return null;

  const getButtonClass = (variant: string) => {
    const baseClass = "rounded px-4 py-2 text-white hover:bg-opacity-90";
    switch (variant) {
      case "danger":
        return `bg-danger ${baseClass}`;
      case "success":
        return `bg-success ${baseClass}`;
      case "primary":
        return `bg-primary ${baseClass}`;
      default:
        return "rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-opacity-90";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="dark:bg-boxdark w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
        
        {children}

        <div className="mt-6 flex justify-end space-x-4">
          {actions.map((action, index) => (
            <button
              key={index}
              className={getButtonClass(action.variant)}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
          <button
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-opacity-90"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 