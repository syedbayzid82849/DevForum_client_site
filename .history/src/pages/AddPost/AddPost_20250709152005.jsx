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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Author Image (প্রোফাইল পিকচার দেখানোর জন্য) */}
            <div className="form-control text-center">
                <label className="label">
                    <span className="label-text">Author Image</span>
                </label>
                <div className="avatar">
                    <div className="w-24 rounded-full mx-auto ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={currentUser?.photoURL || 'https://via.placeholder.com/150'} alt="Author Avatar" />
                    </div>
                </div>
            </div>

            {/* Author Name (Read-only) */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Author Name</span>
                </label>
                <input
                    type="text"
                    readOnly // এটি এডিট করা যাবে না
                    defaultValue={currentUser?.displayName || 'N/A'}
                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
            </div>

            {/* Author Email (Read-only) */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Author Email</span>
                </label>
                <input
                    type="email"
                    readOnly // এটি এডিট করা যাবে না
                    defaultValue={currentUser?.email || 'N/A'}
                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
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
                            isMulti // একাধিক ট্যাগ সিলেক্ট করার জন্য
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select tags..."
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: errors.tag ? 'red' : baseStyles.borderColor, // Error styling
                                    '&:hover': { borderColor: errors.tag ? 'red' : baseStyles['&:hover'].borderColor },
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
                    {...register('upVote')} // register করা হয়েছে defaultValues থেকে মান পেতে
                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
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
                    {...register('downVote')} // register করা হয়েছে defaultValues থেকে মান পেতে
                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-8">
                <button type="submit" className="btn btn-primary btn-block">Add Post</button>
            </div>
        </form>

    );
};

export default AddPost;
