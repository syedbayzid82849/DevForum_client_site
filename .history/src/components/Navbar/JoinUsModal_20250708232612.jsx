import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router";

const JoinUsModal = ({ closeModal }) => {
    const { user, userWithGoogle } = useContext(AuthContext);
    console.log(user);

    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        console.log("Google Sign-In");
        userWithGoogle()
            .then(res => {
                console.log(res.user);
                navigate("/");
            })
            .catch(err => {
                console.error("Google Sign-In Error:", err);
            })
    };
    return (
        <>

        </>
    );
};

export default JoinUsModal;

