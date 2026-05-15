import { useState } from "react";
import Button, { OptionButton } from "../ui/Button";
import { canCreateTicket, ROLES } from "../../utils/AuthUtil";
import { useAuth } from "../../Hooks/useAuth";
import { LuPlus, LuMail, LuBuilding2, LuUserRound, LuTags, LuCalendarClock } from "react-icons/lu";

import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { FormInput, FormTextArea } from "../ui/Input";

import TicketModal from "../ticket/TicketModal";
import useCreateTicket from "../../Hooks/Tickets/useCreateTicket";
import toast from "react-hot-toast";

import { TICKET_CATEGORIES, formatLabel } from "../../utils/TicketUtil";

function Banner() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("low");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [isOpen, setIsOpen] = useState(null);

  const { user } = useAuth();
  const { createTicket } = useCreateTicket();
  const bannerContent = {
    [ROLES.ADMIN]: {
      eyebrow: "Admin Overview",
      title: "Support operations",
      description:
        "Triage new requests, monitor SLA risk, and keep the support queue moving.",
    },
    [ROLES.ASSIGNEE]: {
      eyebrow: "Assignee Workspace",
      title: "Your ticket queue",
      description:
        "Focus on assigned work, update ticket progress, and resolve requests from your queue.",
    },
    [ROLES.CLIENT]: {
      eyebrow: "Request Portal",
      title: "Your support requests",
      description:
        "Create requests, follow status updates, and continue conversations with the support team.",
    },
  }[user?.role] || {
    eyebrow: "STSYSTEM Overview",
    title: "Welcome to ST-SYSTEM",
    description:
      "Manage tickets, track real-time progress, and streamline your support workflow.",
  };

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
  const categoryOptions = TICKET_CATEGORIES.map((category) => ({
    label: formatLabel(category),
    value: category,
    onClick: () => setSelectedCategory(category),
  }));

  const onSubmit = (data) => {
    // console.log({ ...data, priority: selectedPriority })
    createTicket(
      { ...data, priority: selectedPriority, category: selectedCategory, createdBy: user.id, actor: user },
      {
        onSuccess: () => {
          toast.success("Tickets Created!");
          reset();
          setSelectedPriority("low");
          setSelectedCategory("general");
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
    <div className="mb-5 w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm shadow-gray-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none md:p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {/* Left Side: Content */}
        <div className="">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
            {/* <LuSparkles size={12} className="animate-pulse" /> */}
            <span>{bannerContent.eyebrow}</span>
          </div>

          <div>
            <h2 className="mt-2 text-xl font-semibold tracking-normal text-gray-950 dark:text-white">
              {bannerContent.title}
            </h2>
            <p className="max-w-xl text-sm leading-5 text-gray-500 dark:text-gray-400">
              {bannerContent.description}
            </p>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="shrink-0">
          {canCreateTicket(user) && (
            <Button
              variant="primary"
              onClick={() => setOpenModal(true)}
              className="group flex items-center gap-2"
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
          setSelectedCategory("general");
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
        <form className="space-y-2">
          <FormInput
            name="title"
            placeholder="Enter Ticket Title"
            register={register}
            formfields={{ required: "Title is required" }}
            error={errors.title}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <FormInput
              name="customerName"
              placeholder="Customer name"
              icon={<LuUserRound className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />}
              register={register}
              formfields={{}}
            />
            <FormInput
              name="company"
              placeholder="Company"
              icon={<LuBuilding2 className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />}
              register={register}
              formfields={{}}
            />
          </div>
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
              isOpen={isOpen === "priority"}
              setIsOpen={(open) => setIsOpen(open ? "priority" : null)}
            />
            <OptionButton
              title="Category"
              options={categoryOptions}
              selected={selectedCategory}
              isOpen={isOpen === "category"}
              setIsOpen={(open) => setIsOpen(open ? "category" : null)}
            />
            {/* <Button
                        variant='outline'
                         >
                            Assign
                        </Button> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* <FormInput
              name="tags"
              placeholder="Tags: bug, mobile"
              icon={<LuTags className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />}
              register={register}
              formfields={{}}
            /> */}
            <FormInput
              name="dueAt"
              type="datetime-local"
              placeholder="Due date"
              icon={<LuCalendarClock className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />}
              register={register}
              formfields={{}}
            />
          </div>
         
        </form>
      </TicketModal>
    </div>
  );
}

export default Banner;
