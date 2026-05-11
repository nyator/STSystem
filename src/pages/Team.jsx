import { useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import useCreateMember from "../Hooks/Team/useCreateMember";
import Header from "../components/dashboard/Header";
import toast from "react-hot-toast";

import TicketModal from "../components/ticket/TicketModal"
import Button, { OptionButton } from "../components/ui/Button"
import { LuKeyRound, LuPlus, LuUsersRound, LuUserRoundPlus, LuInfo, LuLaptopMinimal } from "react-icons/lu"
import { FormInput } from "../components/ui/Input";
import MemeberGroup from "../components/team/MemberGroup";
import { DEFAULT_ASSIGNEE_PASSWORD } from "../utils/AuthUtil";
import { getLocalStorage, setLocalStorage } from "../Hooks/useLocalStorage";

const DEFAULT_TEAM_OPTIONS = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "DevOps", value: "devops" },
    { label: "Database", value: "database" },
]

const teamOptionValue = (label) => label.trim().toLowerCase().replace(/\s+/g, "-")

function Team() {
    const [openModal, setOpenModal] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState("active")
    const [selectedTeam, setSelectedTeam] = useState()
    const [isOpen, setIsOpen] = useState(null)
    const [isAddingTeamOption, setIsAddingTeamOption] = useState(false)
    const [newTeamOption, setNewTeamOption] = useState("")
    const [teamOptions, setTeamOptions] = useState(() => {
        const storedOptions = getLocalStorage("teamOptions")
        return Array.isArray(storedOptions) && storedOptions.length ? storedOptions : DEFAULT_TEAM_OPTIONS
    })

    const { createMember } = useCreateMember()
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm()

  const StatusOptions = [
    {
      label: "Active",
      value: "active",
      onClick: () => setSelectedStatus("active"),
    },
    {
      label: "Inactive",
      value: "inactive",
      onClick: () => setSelectedStatus("inactive"),
    },
  ];

    const TeamOptions = teamOptions.map((option) => ({
        ...option,
        onClick: () => setSelectedTeam(option.value),
    }))

    const addTeamOption = () => {
        const label = newTeamOption.trim()
        if (!label) return

        const value = teamOptionValue(label)
        const alreadyExists = teamOptions.some((option) => option.value === value)
        if (alreadyExists) {
            toast.error("Option already exists")
            return
        }

        const updatedOptions = [...teamOptions, { label, value }]
        setTeamOptions(updatedOptions)
        setLocalStorage("teamOptions", updatedOptions)
        setSelectedTeam(value)
        setNewTeamOption("")
        setIsAddingTeamOption(false)
        toast.success("Team option added")
    }

  const onSubmit = (data) => {
    // console.log({ ...data, team: selectedTeam })
    createMember(
      { ...data, team: selectedTeam },
      {
        onSuccess: () => {
          toast.success("Member Created!");
          reset();
          setSelectedStatus("active");
          setSelectedTeam(undefined);
          setOpenModal(false);
        },
        onError: () => {
          toast.error("Error creating member!");
          setOpenModal(false);
        },
      },
    );
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 w-full">
        <Header
          icon={<LuUsersRound size={20} className="inline" />}
          title="Team"
          description="Team members and project assigned to them"
        />
      </div>

      <div>
        <div className="flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-[calc(100%-0.5rem)] min-h-[calc(100vh-5.5rem)] m-1 rounded-2xl space-y-2">
          <Button variant="primary" onClick={() => setOpenModal(true)}>
            <LuUserRoundPlus size={15} />
            Add Member
          </Button>
          <MemeberGroup />

        </div>
      </div>

            <TicketModal
                isOpen={openModal}
                onClose={() => { setOpenModal(false); reset(); setSelectedTeam(undefined); setIsOpen(null); setIsAddingTeamOption(false); setNewTeamOption("") }}
                title="Add Member"
                LAction="Cancel"
                RAction="Add Member"
                RIcon={<LuPlus size={16} className="inline mr-2 group-hover:animate-wiggle" />}
                submit={handleSubmit(onSubmit)}
                error={errors.firstName || errors.lastName || errors.email || errors.password}
            >
                <DevTool control={control} />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="flex gap-1 h-10">
                        <FormInput
                            name="firstName"
                            placeholder="First Name"
                            register={register}
                            formfields={{ required: "First name is required" }}
                            error={errors.firstName}
                        />
                        <FormInput
                            name="lastName"
                            placeholder="Last Name"
                            register={register}
                            formfields={{ required: "Last name is required" }}
                            error={errors.lastName}
                        />
                    </div>
                    <FormInput
                        name="email"
                        placeholder="john.deo@example.com"
                        register={register}
                        formfields={{ required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Email is not valid" } }}
                        error={errors.email}
                    />
                    <FormInput
                        name="password"
                        placeholder={`Password (${DEFAULT_ASSIGNEE_PASSWORD})`}
                        type="password"
                        icon={<LuKeyRound className="absolute left-3 top-3 text-gray-700 dark:text-gray-400" size={15} />}
                        register={register}
                        formfields={{ minLength: { value: 6, message: "Password must be at least 6 characters" } }}
                        error={errors.password}
                    />
                    <div className="flex items-center gap-1">
                        {/* <OptionButton
                            title={<LuInfo className='inline' size={14} />}
                            options={StatusOptions}
                            selected={selectedStatus}
                            isOpen={isOpen === "status"}
                            setIsOpen={(open) => setIsOpen(open ? 'status' : null)}
                        /> */}
                        <OptionButton
                            title={<LuLaptopMinimal className='inline' size={14} />}
                            options={TeamOptions}
                            selected={selectedTeam || "Select Team"}
                            isOpen={isOpen === "team"}
                            setIsOpen={(open) => setIsOpen(open ? 'team' : null)}
                        />
                        <button
                            type="button"
                            onClick={() => setIsAddingTeamOption((open) => !open)}
                            className="bg-gray-100 dark:bg-gray-700 mb-2 p-2 text-mblack dark:text-gray-200 font-medium rounded-lg flex items-center justify-center text-xs transition-all ease-in-out duration-300 active:scale-[0.97] hover:bg-gray-200 dark:hover:bg-gray-600"
                            aria-label="Add team option"
                            title="Add team option"
                        >
                            <LuPlus size={14} />
                        </button>
                    </div>
                    {isAddingTeamOption && (
                        <div className="flex items-center gap-1">
                            <input
                                type="text"
                                value={newTeamOption}
                                onChange={(event) => setNewTeamOption(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault()
                                        addTeamOption()
                                    }
                                }}
                                placeholder="New option"
                                className="w-full p-2 text-mblack font-medium text-xs bg-gray-50/50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 h-10 rounded-lg focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-600 transition-colors duration-300 dark:text-gray-200"
                            />
                            <Button variant="primary" type="button" onClick={addTeamOption}>
                                <LuPlus size={14} />
                                Add
                            </Button>
                        </div>
                    )}
                </form>
            </TicketModal>
        </div>
    )
}

export default Team
