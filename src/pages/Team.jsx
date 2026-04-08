import { useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import useCreateMember from "../Hooks/Team/useCreateMember"
import Header from "../components/dashboard/Header"
import toast from "react-hot-toast";

import TicketModal from "../components/ticket/TicketModal"
import Button, { OptionButton } from "../components/ui/Button"
import { LuPlus, LuUsersRound, LuUserRoundPlus, LuInfo, LuLaptopMinimal } from "react-icons/lu"
import { FormInput } from "../components/ui/Input";
import MemeberGroup from "../components/team/MemberGroup";

function Team() {
    const [openModal, setOpenModal] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState("active")
    const [selectedTeam, setSelectedTeam] = useState()
    const [isOpen, setIsOpen] = useState(null)

    const { createMember } = useCreateMember()
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm()

    const StatusOptions = [
        { label: "Active", value: "active", onClick: () => setSelectedStatus("active") },
        { label: "Inactive", value: "inactive", onClick: () => setSelectedStatus("inactive") },
    ]

    const TeamOptions = [
        { label: "Frontend", value: "frontend", onClick: () => setSelectedTeam("frontend") },
        { label: "Backend", value: "backend", onClick: () => setSelectedTeam("backend") },
        { label: "DevOps", value: "devops", onClick: () => setSelectedTeam("devops") },
        { label: "Database", value: "database", onClick: () => setSelectedTeam("database") },
    ]

    const onSubmit = (data) => {
        // console.log({ ...data, team: selectedTeam })
        createMember({ ...data, team: selectedTeam }, {
            onSuccess: () => {
                toast.success("Member Created!")
                reset()
                setSelectedStatus("active")
                setSelectedTeam(undefined)
                setOpenModal(false)
            },
            onError: () => {
                toast.error("Error creating member!")
                setOpenModal(false)
            }
        })
    }

    return (
        <div>
            <div className='sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 w-full'>
                <Header
                    icon={<LuUsersRound size={20} className="inline" />}
                    title="Team"
                    description="Team members and project assigned to them"
                />
            </div>

            <div>
                <div className='flex flex-col items-start bg-white dark:bg-gray-800 p-4 w-[calc(100%-0.5rem)] min-h-[calc(100vh-5.5rem)] m-1 rounded-2xl space-y-2'>
                    <Button
                        variant="primary"
                        onClick={() => setOpenModal(true)}
                    >
                        <LuUserRoundPlus size={15} />
                        Add Member
                    </Button>

                    <MemeberGroup />
                </div>
            </div>

            <TicketModal
                isOpen={openModal}
                onClose={() => { setOpenModal(false); reset(); setSelectedTeam(undefined); setIsOpen(null) }}
                title="Add Member"
                LAction="Cancel"
                RAction="Add Member"
                RIcon={<LuPlus size={16} className="inline mr-2 group-hover:animate-wiggle" />}
                submit={handleSubmit(onSubmit)}
                error={errors.firstName || errors.lastName || errors.email}
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
                    </div>
                </form>
            </TicketModal>
        </div>
    )
}

export default Team