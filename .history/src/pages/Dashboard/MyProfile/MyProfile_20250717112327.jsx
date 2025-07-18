import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import EditProfileModal from "../../../components/EditProfileModal/EditProfileModal";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

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
    const [tagInput, setTagInput] = useState("");

    // Fetch user from DB
    const { data: dbUser = {} } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Fetch total stats (only for admin)
    const { data: stats = {} } = useQuery({
        queryKey: ["siteStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/stats");
            return res.data;
        },
        enabled: dbUser?.role === "admin",
    });

    const pieData = [
        { name: "Posts", value: stats.posts || 0 },
        { name: "Comments", value: stats.comments || 0 },
        { name: "Users", value: stats.users || 0 },
    ];

    const tagMutation = useMutation({
        mutationFn: async (newTag) => {
            return await axiosSecure.post("/tags", { name: newTag });
        },
        onSuccess: () => {
            Swal.fire("Added!", "Tag added successfully.", "success");
            setTagInput("");
        },
    });

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

    const handleTagSubmit = (e) => {
        e.preventDefault();
        if (tagInput.trim()) tagMutation.mutate(tagInput.trim());
    };

    const badge =
        dbUser?.badge === "Gold"
            ? { label: "Gold", icon: "/src/assets/gold-Badge.png" }
            : { label: "Bronze", icon: "/src/assets/bronze-Badge.png" };

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

    return (
        <div className="w-3m\x4 mx-auto px-4 py-10">
            <div className="bg-base-100 p-6 rounded-xl shadow-lg">
                <img
                    src={dbUser?.photoURL || user?.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
                />
                <h2 className="text-2xl font-bold text-center">
                    {dbUser?.name || user?.displayName}
                </h2>
                <p className="text-gray-600 text-center">{dbUser?.email || user?.email}</p>

                <div className="flex justify-center items-center gap-2 my-4">
                    <img src={badge.icon} alt="badge" className="w-6 h-6" />
                    <span className="text-sm font-semibold">{badge.label} Badge</span>
                </div>

                {dbUser?.role === "admin" ? (
                    <>
                        <h3 className="text-xl font-bold mt-6 mb-2">Admin Dashboard</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="bg-primary text-white p-4 rounded-lg">
                                <p className="text-lg font-semibold">Total Posts</p>
                                <p className="text-2xl">{stats.posts}</p>
                            </div>
                            <div className="bg-secondary text-white p-4 rounded-lg">
                                <p className="text-lg font-semibold">Total Comments</p>
                                <p className="text-2xl">{stats.comments}</p>
                            </div>
                            <div className="bg-accent text-white p-4 rounded-lg">
                                <p className="text-lg font-semibold">Total Users</p>
                                <p className="text-2xl">{stats.users}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <PieChart width={300} height={300}>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                        <form onSubmit={handleTagSubmit} className="mt-8">
                            <label className="block font-medium mb-1">Add New Tag</label>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Enter tag name"
                                required
                            />
                            <button type="submit" className="btn btn-success mt-3">
                                Add Tag
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="mt-4 border p-4 rounded">
                            <h4 className="font-semibold">About Me:</h4>
                            {dbUser?.aboutMe && <p className="text-gray-500 mt-1">{dbUser.aboutMe}</p>}
                        </div>

                        <div className="flex justify-center gap-4 mt-4">
                            {dbUser?.twitter && <a href={dbUser.twitter} target="_blank" rel="noreferrer" className="text-blue-500">Twitter</a>}
                            {dbUser?.linkedin && <a href={dbUser.linkedin} target="_blank" rel="noreferrer" className="text-blue-500">LinkedIn</a>}
                            {dbUser?.github && <a href={dbUser.github} target="_blank" rel="noreferrer" className="text-blue-500">GitHub</a>}
                        </div>

                        <button className="btn btn-outline btn-primary mt-6" onClick={handleEditClick}>
                            Edit Profile
                        </button>
                    </>
                )}
            </div>

                  {dbUser?.role === "admin" && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
          <AdminStatsPieChart />
          <AddTagForm />
        </div>
      )}

            {/* Modal */}
            {showModal && (
                <EditProfileModal
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default MyProfile;
