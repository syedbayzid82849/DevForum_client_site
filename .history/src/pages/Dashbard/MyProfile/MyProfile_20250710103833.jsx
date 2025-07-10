import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: "", photoURL: "", aboutMe: "" });

    // Get user details from database
    const { data: dbUser = {} } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Handle update form change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Mutation for update
    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put(`/users/${dbUser._id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success!", "Profile updated successfully", "success");
            setIsEditing(false);
            queryClient.invalidateQueries(["userProfile"]);
        },
    });

    // Handle update submission
    const handleUpdate = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <Helmet>
                <title>My Profile | PetHub</title>
            </Helmet>

            <div className="bg-base-100 p-6 rounded-xl shadow-lg text-center">
                <img
                    src={dbUser?.photoURL || user?.photoURL}
                    alt="User"
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
                />
                <h2 className="text-2xl font-bold">{dbUser?.name || user?.displayName}</h2>
                <p className="text-gray-600">{dbUser?.email || user?.email}</p>

                {dbUser?.aboutMe && (
                    <div className="mt-4">
                        <h4 className="font-semibold">About Me:</h4>
                        <p className="text-gray-500">{dbUser.aboutMe}</p>
                    </div>
                )}

                <button
                    className="btn btn-outline btn-primary mt-6"
                    onClick={() => {
                        setIsEditing(true);
                        setFormData({
                            name: dbUser?.name || user?.displayName,
                            photoURL: dbUser?.photoURL || user?.photoURL,
                            aboutMe: dbUser?.aboutMe || "",
                        });
                    }}
                >
                    Edit Profile
                </button>
            </div>

            {/* Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-semibold mb-4 text-center">Update Profile</h3>
                        <form onSubmit={handleUpdate} className="grid gap-4">
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
                                rows={3}
                            ></textarea>

                            <div className="flex justify-between mt-4">
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-error btn-outline"
                                    onClick={() => setIsEditing(false)}
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
