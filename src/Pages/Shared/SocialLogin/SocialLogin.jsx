import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                showSuccessAlert();
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                showErrorAlert(error.message);
            });
    }

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Sign Up Successful!',
            text: 'You can now log in with your credentials.',
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Sign Up Failed',
            text: errorMessage,
        });
    };


    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn btn-ghost hover:bg-red-200 text-white border-red-500 w-72 mb-5">
                <FcGoogle />
                Google
            </button>
        </div>
    );
};

export default SocialLogin;