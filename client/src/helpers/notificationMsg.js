import { toast } from "react-toastify";

export const successMsg = (msg) => {
	return toast.success(
        msg,
        {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
    );	
}

export const errorMsg = (msg = 'Something went wrong') => {
	return toast.error(
        msg,
        {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
    );	
}