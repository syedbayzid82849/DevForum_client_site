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

    // Get user's post count (limit 5 for normal)
    const { data, isPending, refetch } = useQuery({
        queryKey: ['postCount', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/count?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // ✅ Fetch Tags from DB
    const { data: allTags = [], isLoading: tagsLoading } = useQuery({
        queryKey: ['allTags'],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        }
    });

    // ✅ Convert DB tags into react-select format
    const tagOptions = allTags.map(tag => ({
        value: tag.tag,
        label: tag.tag.charAt(0).toUpperCase() + tag.tag.slice(1)
    }));

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            authorImage: user?.photoURL || "/src/assets/user-default.jpg",
            authorName: user?.displayName || "Anonymous User",
            authorEmail: user?.email || "anonymous@example.com",
            postTitle: '',
            postDescription: '',
            tag: [],
            upVote: [],
            downVote: [],
            commentCount: [],
            createdAt: new Date().toISOString()
        }
    });

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
        } catch (error) {
            console.error("Error adding post:", error);
            toast.error('Failed to add post. Please try again.');
        }
    };

    if (isPending || tagsLoading) return <LoadingSpinner />;

    // Post limit block
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
                                <img src={user?.photoURL} alt="Author Image" />
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
                            className="input input-bordered w-full cursor-not-allowed"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Author Email</span>
                        </label>
                        <input
                            type="email"
                            readOnly
                            {...register('authorEmail')}
                            className="input input-bordered w-full cursor-not-allowed"
                        />
                    </div>

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

                    {/* ✅ Dynamic Tags */}
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
                                    placeholder="Select tags..."
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderColor: errors.tag ? 'red' : base.borderColor,
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            color: 'black',
                                            backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: 'black',
                                        }),
                                        input: (base) => ({
                                            ...base,
                                            color: 'black',
                                        }),
                                        placeholder: (base) => ({
                                            ...base,
                                            color: '#a0a0a0',
                                        }),
                                    }}
                                />
                            )}
                        />
                        {errors.tag && <span className="label-text-alt text-red-500">{errors.tag.message}</span>}
                    </div>

                    <div className="form-control mt-8">
                        <button type="submit" className="btn btn-primary btn-block">Add Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
