import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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

                                <button type="submit" className="btn btn-primary">Save</button>
                                <button type="button" className="btn btn-outline btn-error" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
