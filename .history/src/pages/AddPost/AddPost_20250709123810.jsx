import { useForm } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AddPost = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Step 1: Get post count for user
    const { data, isPending } = useQuery({
        queryKey: ['postCount', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/count?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const {
        register,
        handleSubmit,
        reset
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
            tag: data.tag?.value || "general",
            upVote: 0,
            downVote: 0,
        };

        await axiosSecure.post("/posts", post);
        console.log("Post added successfully:", post);
        reset();
        navigate("/dashboard/my-posts");
    };

    if (isPending) return <LoadingSpinner />;

    // Step 2: Check post count and show message
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
            <Select
                options={tagOptions}
                {...register("tag")}
                placeholder="Select a tag"
                className="w-full"
            />
            <button type="submit" className="btn btn-success w-full">
                Submit Post
            </button>
        </form>
    );
};

export default AddPost;
