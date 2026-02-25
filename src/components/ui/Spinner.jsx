
import { CgSpinner } from "react-icons/cg";

function Spinner() {
  return (
    <div className="max-w-sm w-fit mx-auto">
        <CgSpinner className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  )
}

export default Spinner