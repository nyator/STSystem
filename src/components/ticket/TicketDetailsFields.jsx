import { LuMail } from "react-icons/lu";

import { FormInput, FormTextArea } from "../ui/Input";

function TicketDetailsFields({
  register,
  errors = {},
  showEmail = false,
  titlePlaceholder = "Ticket Title",
  descriptionPlaceholder = "Ticket Description",
}) {
  return (
    <div className="space-y-2">
      <FormInput
        name="title"
        placeholder={titlePlaceholder}
        register={register}
        formfields={{}}
        error={errors.title}
        readOnly
      />

      {showEmail && (
        <FormInput
          name="email"
          placeholder="Customer email"
          icon={
            <LuMail
              className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
              size={15}
            />
          }
          register={register}
          formfields={{}}
          error={errors.email}
          readOnly
        />
      )}

      <FormTextArea
        name="description"
        placeholder={descriptionPlaceholder}
        register={register}
        formfields={{}}
        error={errors.description}
        readOnly
      />
    </div>
  );
}

export default TicketDetailsFields;
