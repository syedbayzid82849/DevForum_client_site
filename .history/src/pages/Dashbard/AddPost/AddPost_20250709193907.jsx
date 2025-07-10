import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import toast from 'react-hot-toast';
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddPost = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Get post count for user
    const { data, isPending, refetch } = useQuery({
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
        control,
        formState: { errors },

    } = useForm({
        defaultValues: {
            authorImage: user?.photoURL || "https://via.placeholder.com/150",
            authorName: user?.displayName || "Anonymous User",
            authorEmail: user?.email || "anonymous@example.com",
            postTitle: '',
            postDescription: '',
            tag: [],
            upVote: 0,
            downVote: 0,
        }
    });

    const tagOptions = [
        { value: "funny", label: "Funny" },
        { value: "informative", label: "Informative" },
        { value: "sad", label: "Sad" },
        { value: "cute", label: "Cute" },
        { value: "general", label: "General" },
    ];

    const onSubmit = async (formData) => {
        const tags = formData.tag ? formData.tag.map(tag => tag.value) : [];

        const post = {
            authorImage: formData.authorImage,
            authorName: formData.authorName,
            authorEmail: formData.authorEmail,
            title: formData.postTitle,
            description: formData.postDescription,
            tags: tags,
            upVote: formData.upVote,
            downVote: formData.downVote,
            createdAt: new Date().toISOString()
        };

        try {
            await axiosSecure.post("/posts", post);
            toast.success('Post added successfully!');
            refetch();
            navigate("/dashboard/my-posts");
            toast.success('Post added successfully!');
        } catch (error) {
            console.error("Error adding post:", error);
            toast.error('Failed to add post. Please try again.');
        }
    };

    const currentUser = user;

    if (isPending) return <LoadingSpinner />;

    if (data && data.count >= 5) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
                <div className="card w-full max-w-lg bg-base-100 shadow-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Post Limit Reached!</h2>
                    <p className="text-lg mb-6">
                        You have reached the post limit for normal users.
                        To add more posts, please become a member!
                    </p>
                    <button
                        onClick={() => navigate("/membership")}
                        className="btn btn-primary btn-lg"
                    >
                        Become a Member
                    </button>
                    <button
                        onClick={() => navigate("my-posts")}
                        className="btn mt-2 btn-primary btn-lg"
                    >
                        Delete A Post
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center py-10 px-4">
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl ">
                <h2 className="text-4xl font-bold text-center mb-8">Add New Post</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control text-center">

                        <div className="avatar">
                            <div className="w-24 rounded-full mx-auto ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={currentUser?.photoURL} alt="Author Image" />
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Author Name</span>
                        </label>
                        <input
                            type="text"
                            readOnly
                            {...register('authorName')}
                            className="input input-bordered w-full  cursor-not-allowed"
                        />
                    </div>

                    {/* Author Email (Read-only) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Author Email</span>
                        </label>
                        <input
                            type="email"
                            readOnly
                            {...register('authorEmail')}
                            className="input input-bordered w-full  cursor-not-allowed"
                        />
                    </div>

                    {/* Post Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Post Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your post title"
                            {...register('postTitle', { required: 'Post Title is required' })}
                            className={`input input-bordered w-full ${errors.postTitle ? 'input-error' : ''}`}
                        />
                        {errors.postTitle && <span className="label-text-alt text-red-500">{errors.postTitle.message}</span>}
                    </div>

                    {/* Post Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Post Description</span>
                        </label>
                        <textarea
                            placeholder="Describe your post in detail"
                            {...register('postDescription', { required: 'Post Description is required' })}
                            className={`textarea textarea-bordered h-24 w-full ${errors.postDescription ? 'textarea-error' : ''}`}
                        ></textarea>
                        {errors.postDescription && <span className="label-text-alt text-red-500">{errors.postDescription.message}</span>}
                    </div>

                    {/* Tag (using react-select) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Tags</span>
                        </label>
                        <Controller
                            name="tag"
                            control={control}
                            rules={{ required: 'Please select at least one tag' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={tagOptions}
                                    isMulti={true}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Select tags..."
                                    styles={{
                                        control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderColor: errors.tag ? 'red' : baseStyles.borderColor,
                                            '&:hover': { borderColor: errors.tag ? 'red' : baseStyles['&:hover'].borderColor },
                                        }),
                                        // Add this to make text black
                                        option: (baseStyles, state) => ({
                                            ...baseStyles,
                                            color: 'black', // Option text color
                                            backgroundColor: state.isFocused ? '#e0e0e0' : 'white', // Focused option background
                                            ':active': {
                                                backgroundColor: state.isSelected ? baseStyles.backgroundColor : '#cccccc',
                                            },
                                        }),
                                        multiValueLabel: (baseStyles) => ({
                                            ...baseStyles,
                                            color: 'black', // Selected tag text color within the input
                                        }),
                                        singleValue: (baseStyles) => ({
                                            ...baseStyles,
                                            color: 'black', // For single select (though you have isMulti=true)
                                        }),
                                        input: (baseStyles) => ({
                                            ...baseStyles,
                                            color: 'black', // Typed input text color
                                        }),
                                        placeholder: (baseStyles) => ({
                                            ...baseStyles,
                                            color: '#a0a0a0', // Placeholder text color (e.g., "Select tags...")
                                        }),
                                    }}
                                />
                            )}
                        />
                        {errors.tag && <span className="label-text-alt text-red-500">{errors.tag.message}</span>}
                    </div>

                    {/* UpVote (Default Zero - Hidden or Readonly) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">UpVote (Default: 0)</span>
                        </label>
                        <input
                            type="number"
                            readOnly
                            {...register('upVote')}
                            className="input input-bordered w-full  cursor-not-allowed"
                        />
                    </div>

                    {/* DownVote (Default Zero - Hidden or Readonly) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">DownVote (Default: 0)</span>
                        </label>
                        <input
                            type="number"
                            readOnly
                            {...register('downVote')}
                            className="input input-bordered w-full  cursor-not-allowed"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-8">
                        <button type="submit" className="btn btn-primary btn-block">Add Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;