import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import { LuLockKeyhole, LuLogIn, LuMail } from "react-icons/lu";
import toast from "react-hot-toast";
import { FormInput } from "../components/ui/Input";
import { useAuth } from "../Hooks/useAuth";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);
      if (result?.success) {
        navigate(location.state?.from?.pathname || "/", { replace: true });
      } else {
        toast.error(result?.message || "Login failed");
      }
    } catch (error) {
      setError("password", { type: "manual", message: error.message });
      toast.error(error?.message || "Login failed");
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
                className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-400"
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
                className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-400"
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
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-2 rounded-lg transition-all duration-300 ease-in-out active:scale-[0.97]"
          >
            {isSubmitting ? "Logging in..." : "Login"}
            <LuLogIn size={16} />
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
