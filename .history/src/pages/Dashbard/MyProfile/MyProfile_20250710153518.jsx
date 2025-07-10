import { useContext, useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../context/AuthContext";
// import { Helmet } from "react-helmet-async";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        photoURL: "",
        aboutMe: "",
        twitter: "",
        linkedin: "",
        github: "",
    });

    // Fetch user from DB
    const { data: dbUser = {} } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    console.log(dbUser);

    // Set modal form with current user data
    const handleEditClick = () => {
        setFormData({
            name: dbUser?.name || user?.displayName || "",
            photoURL: dbUser?.photoURL || user?.photoURL || "",
            aboutMe: dbUser?.aboutMe || "",
            twitter: dbUser?.twitter || "",
            linkedin: dbUser?.linkedin || "",
            github: dbUser?.github || "",
        });
        setShowModal(true);
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put(`/users/${dbUser._id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userProfile"]);
            Swal.fire("Updated!", "Profile updated successfully.", "success");
            setShowModal(false);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    // Badge logic
    const badge =
        dbUser?.role === "member"
            ? { label: "Gold", icon: "/src/assets/gold-Badge.png" }
            : { label: "Bronze", icon: "/src/assets/bronze-Badge.png" };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {/* <Helmet>
                <title>My Profile | PetHub</title>
            </Helmet> */}

            <div className="bg-base-100 p-6 rounded-xl shadow-lg text-center">
                <img
                    src={dbUser?.photoURL || user?.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
                />
                <h2 className="text-2xl font-bold">
                    {dbUser?.name || user?.displayName}
                </h2>
                <p className="text-gray-600">{dbUser?.email || user?.email}</p>

                {/* Badge */}
                <div className="flex justify-center items-center gap-2 my-4">
                    <img src={badge.icon} alt="badge" className="w-6 h-6" />
                    <span className="text-sm font-semibold">{badge.label} Badge</span>
                </div>

                {/* About Me */}
                <div className="mt-4">
                    <h4 className="font-semibold">About Me:</h4>
                                    {dbUser?.aboutMe && (

                )}
                    <p className="text-gray-500">{dbUser.aboutMe}</p>
                </div>


                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-4">
                    {dbUser?.twitter && (
                        <a
                            href={dbUser.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Twitter
                        </a>
                    )}
                    {dbUser?.linkedin && (
                        <a
                            href={dbUser.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            LinkedIn
                        </a>
                    )}
                    {dbUser?.github && (
                        <a
                            href={dbUser.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            GitHub
                        </a>
                    )}
                </div>

                {/* Edit Button */}
                <button
                    className="btn btn-outline btn-primary mt-6"
                    onClick={handleEditClick}
                >
                    Edit Profile
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-center">
                            Update Profile
                        </h3>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="photoURL"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                value={formData.photoURL}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="aboutMe"
                                placeholder="About Me"
                                className="textarea textarea-bordered"
                                value={formData.aboutMe}
                                onChange={handleChange}
                            ></textarea>
                            <input
                                type="url"
                                name="twitter"
                                placeholder="Twitter URL"
                                className="input input-bordered"
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                className="input input-bordered"
                                value={formData.linkedin}
                                onChange={handleChange}
                            />
                            <input
                                type="url"
                                name="github"
                                placeholder="GitHub URL"
                                className="input input-bordered"
                                value={formData.github}
                                onChange={handleChange}
                            />
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline btn-error"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
