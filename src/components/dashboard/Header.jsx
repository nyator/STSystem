import { useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import TicketModal from "../ticket/TicketModal";
import useCreateTicket from "../../Hooks/Tickets/useCreateTicket";
import toast from "react-hot-toast";

import Button, { OptionButton } from "../ui/Button";

import { ThemeToggle2 } from "../ui/ThemeToggles";
import { LuPlus, LuMail } from "react-icons/lu";
import { FormInput, FormTextArea } from "../ui/Input";
import { canCreateTicket } from "../../utils/AuthUtil";
import { useAuth } from "../../Hooks/useAuth";
import { getUsers } from "../../utils/AuthUtil";

function Header({ icon, title, description }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("low");
  const [isOpen, setIsOpen] = useState(null);

  const { user, isAuthenticated, logout } = useAuth();
  const loginUsers = getUsers();

  const { createTicket } = useCreateTicket();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const priorityOptions = [
    { label: "Low", value: "low", onClick: () => setSelectedPriority("low") },
    {
      label: "Medium",
      value: "medium",
      onClick: () => setSelectedPriority("medium"),
    },
    {
      label: "High",
      value: "high",
      onClick: () => setSelectedPriority("high"),
    },
  ];

  const onSubmit = (data) => {
    // console.log({ ...data, priority: selectedPriority })
    createTicket(
      { ...data, priority: selectedPriority, createdBy: user.id },
      {
        onSuccess: () => {
          toast.success("Tickets Created!");
          reset();
          setSelectedPriority("low");
          setOpenModal(false);
        },
        onError: () => {
          toast.error("Error creating tickets!");
          // setOpenModal(false)
        },
      },
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between z-0">
        <div className="block">
          <div className="flex justify-start w-full items-end space-x-2">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-900 p-1  w-fit text-blue-500">
              {icon}
            </div>
            <h1 className="text-xl font-semibold dark:text-white">{title}</h1>
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-xs hidden sm:block">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <ThemeToggle2 />
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-1 px-2 py-2 leading-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-gray-100 text-xs font-medium dark:bg-gray-800">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-gray-700 dark:text-gray-200">
                  {user.name}
                </p>
                <p className="text-[7px] text-gray-400 uppercase dark:text-gray-500">
                  {user.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
