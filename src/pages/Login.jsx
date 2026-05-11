import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LuLockKeyhole, LuLogIn, LuMail } from "react-icons/lu";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import { FormInput } from "../components/ui/Input";
import { useAuth } from "../Hooks/useAuth";
import logo from "../assets/logo.png";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (data) => {
    try {
      login(data.email, data.password);
      toast.success("Logged in");
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (error) {
      setError("password", { type: "manual", message: error.message });
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 flex flex-col justify-center"
        >
          <div className="mb-5">
            <h2 className="text-xl font-semibold dark:text-white">Login</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Enter the email and password for your account.
            </p>
          </div>

          <FormInput
            name="email"
            placeholder="Email"
            icon={
              <LuMail
                className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{ required: "Email is required" }}
            error={errors.email}
          />
          <FormInput
            name="password"
            placeholder="Password"
            type="password"
            icon={
              <LuLockKeyhole
                className="absolute left-3 top-3 text-gray-700 dark:text-gray-400"
                size={15}
              />
            }
            register={register}
            formfields={{ required: "Password is required" }}
            error={errors.password}
          />

          {errors.password && (
            <p className="text-xs text-red-500 mb-3">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-300 ease-in-out active:scale-[0.97]"
          >
            Login
            <LuLogIn size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
