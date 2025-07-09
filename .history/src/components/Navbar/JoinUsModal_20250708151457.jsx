import { FcGoogle } from "react-icons/fc";
import { HiAnnotation } from "react-icons/hi";

const JoinUsModal = ({ closeModal }) => {


    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={closeModal}
            >
                <div
                    className="bg-white rounded-lg p-6 w-96 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-xl font-bold"
                        title="Close"
                    >
                        &times;
                    </button>

                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        login
                    </h2>

                    <div className="divider">OR</div>

                    <button
                        onClick={() => HiAnnotation}
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                    >
                        <FcGoogle size={24} />
                        Continue with Google
                    </button>
                </div>
            </div>
        </>
    );
};

export default JoinUsModal;
