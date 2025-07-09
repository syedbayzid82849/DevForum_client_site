import { FcGoogle } from "react-icons/fc";

const JoinUsModal = ({ closeModal }) => {

    const handleGoogleSignIn = () => {
        // Implement Google Sign-In logic here
        alert("Google login not implemented yet");
    };
    return (
        <>
            <button
                onClick={() => handleGoogleSignIn()}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
            >
                <FcGoogle size={24} />
                Continue with Google
            </button>
        </>
    );
};

export default JoinUsModal;
