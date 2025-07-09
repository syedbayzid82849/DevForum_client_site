// src/pages/Dashboard/User/AddPost.jsx
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AddPost = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedTag, setSelectedTag] = useState(null);

    // Get post count for user
    const { data, isPending } = useQuery({
        queryKey: ['postCount', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/posts/count?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const {
        register,
        handleSubmit,
    } = useForm();

    const tagOptions = [
        { value: "funny", label: "Funny" },
        { value: "informative", label: "Informative" },
        { value: "sad", label: "Sad" },
        { value: "cute", label: "Cute" },
    ];

    const onSubmit = async (data) => {
        const post = {
            authorImage: user?.photoURL || "none",
            authorName: user?.displayName || "none",
            authorEmail: user?.email || "none",
            title: data.title,
            description: data.description,
            tag: selectedTag?.value || "general",
            upVote: 0,
            downVote: 0,
        };

        await axios.post("http://localhost:3000/posts", post);
        setSelectedTag(null);
        navigate("/dashboard/my-posts");
    };

    if (isPending) return <LoadingSpinner />;

    if (data.count >= 5) {
        return (
            <div className="text-center mt-10">
                <p className="text-xl text-red-600 mb-4">
                    You have reached the post limit for normal users.
                </p>
                <button
                    onClick={() => navigate("/membership")}
                    className="btn btn-primary"
                >
                    Become a Member
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto space-y-4 p-6 shadow rounded bg-white"
        >
            <input
                {...register("title", { required: true })}
                placeholder="Post Title"
                className="input input-bordered w-full"
            />
            <textarea
                {...register("description", { required: true })}
                placeholder="Post Description"
                className="textarea textarea-bordered w-full"
            />

            <button type="submit" className="btn btn-success w-full">
                Submit Post
            </button>
        </form>
    );
};

export default AddPost;
