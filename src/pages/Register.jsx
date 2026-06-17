import { useForm } from "react-hook-form";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { LuLockKeyhole, LuMail, LuUser, LuUserPlus } from "react-icons/lu";
import { FormInput } from "../components/ui/Input";
import { useAuth } from "../Hooks/useAuth";

const ROLES = ["client", "agent", "admin"];

function Register() {
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "agent",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    if (result?.success) {
      navigate("/", { replace: true });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 flex flex-col justify-center"
        >
          <div className="mb-5">
            <h2 className="text-xl font-semibold dark:text-white">
              Create account
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Fill in the details below to register.
            </p>
          </div>

          <FormInput
            name="firstName"
            placeholder="First name"
            icon={
              <LuUser
                className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{ required: "First name is required" }}
            error={errors.firstName}
          />

          <FormInput
            name="lastName"
            placeholder="Last name"
            icon={
              <LuUser
                className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{ required: "Last name is required" }}
            error={errors.lastName}
          />

          <FormInput
            name="email"
            placeholder="Email"
            icon={
              <LuMail
                className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
            error={errors.email}
          />

          <FormInput
            name="password"
            placeholder="Password"
            type="password"
            icon={
              <LuLockKeyhole
                className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            error={errors.password}
          />

          <FormInput
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
            icon={
              <LuLockKeyhole
                className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
            error={errors.confirmPassword}
          />

          {/* Role tabs */}
          <input type="hidden" {...register("role", { required: true })} />
          <div className="mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
              Role
            </p>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setValue("role", role)}
                  className={`flex-1 py-1.5 text-xs font-medium capitalize transition-colors duration-200
                    ${
                      selectedRole === role
                        ? "bg-blue-500 text-white"
                        : "bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-2 rounded-lg transition-all duration-300 ease-in-out active:scale-[0.97]"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
            <LuUserPlus size={16} />
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
