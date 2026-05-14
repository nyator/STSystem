import { useState } from "react";
import Button, { OptionButton } from "../ui/Button"; // Removed OptionButton as it wasn't used
import { canCreateTicket } from "../../utils/AuthUtil";
import { useAuth } from "../../Hooks/useAuth";
import { LuSparkles, LuPlus, LuMail } from "react-icons/lu";

import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { FormInput, FormTextArea } from "../ui/Input";

import TicketModal from "../ticket/TicketModal";
import useCreateTicket from "../../Hooks/Tickets/useCreateTicket";
import toast from "react-hot-toast";

import { getUsers } from "../../utils/AuthUtil";

function Banner() {
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
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 p-4 md:p-6 shadow-slate-100 shadow-xl border border-white/5 mb-6">
      {/* Dynamic Background Blurs */}
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-10 right-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
        {/* Left Side: Content */}
        <div className="">
          <div className="inline-flex items-center gap-2 rounded-md bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 border border-blue-500/20">
            {/* <LuSparkles size={12} className="animate-pulse" /> */}
            <span>STSYSTEM Overview</span>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Welcome to <span className="text-blue-400">ST-SYSTEM</span>
            </h2>
            <p className="text-sm text-slate-400 max-w-md leading-tight">
              Manage tickets, track real-time progress, and streamline your
              support workflow from one central hub.
            </p>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="shrink-0">
          {canCreateTicket(user) && (
            <Button
              variant="primary"
              onClick={() => setOpenModal(true)}
              className="group flex items-center gap-2 px-6 py-2.5 shadow-lg shadow-blue-500/20 transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
            >
              <LuPlus
                size={18}
                className="transition-transform group-hover:rotate-90 duration-300"
              />
              <span className="font-bold text-[13px]">New Ticket</span>
            </Button>
          )}
        </div>
      </div>

      <TicketModal
        size="sm"
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          reset();
          setSelectedPriority("low");
        }}
        title="New Ticket"
        LAction="Cancel"
        RAction="Create Ticket"
        RIcon={
          <LuPlus
            size={16}
            className="inline mr-2 group-hover:animate-wiggle"
          />
        }
        submit={handleSubmit(onSubmit)}
        error={errors.title || errors.email || errors.description}
      >
        <DevTool control={control} /> {/* set up the dev tool */}
        <form className="space-y-4">
          <FormInput
            name="title"
            placeholder="Enter Ticket Title"
            register={register}
            formfields={{ required: "Title is required" }}
            error={errors.title}
          />
          <FormInput
            name="email"
            placeholder="Enter customer email"
            icon={
              <LuMail
                className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            error={errors.email}
          />
          <FormTextArea
            name="description"
            placeholder="Enter Ticket Description"
            register={register}
            formfields={{ required: "Description is required" }}
            error={errors.description}
          />
          <div className="flex space-x-2">
            <OptionButton
              title="Priority"
              options={priorityOptions}
              selected={selectedPriority}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            {/* <Button
                        variant='outline'
                         >
                            Assign
                        </Button> */}
          </div>
        </form>
      </TicketModal>
    </div>
  );
}

export default Banner;
