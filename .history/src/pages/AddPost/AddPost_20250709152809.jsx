import { useForm, Controller } from "react-hook-form"; 
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import toast from 'react-hot-toast'; 

const AddPost = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Get post count for user
    const { data, isPending, refetch } = useQuery({ 
        queryKey: ['postCount', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/posts/count?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 

    const {
        register,
        handleSubmit,
        control, // Controller এর জন্য control অবজেক্ট ইম্পোর্ট করুন
        formState: { errors }, // errors অবজেক্ট এখানে ডিস্ট্রাকচার করুন
        reset // ফর্ম রিসেট করার জন্য
    } = useForm({
        defaultValues: {
            authorImage: user?.photoURL || "https://via.placeholder.com/150",
            authorName: user?.displayName || "Anonymous User",
            authorEmail: user?.email || "anonymous@example.com",
            postTitle: '',
            postDescription: '',
            tag: [], // multiple select এর জন্য এটি একটি array হবে
            upVote: 0,
            downVote: 0,
        }
    });

    const tagOptions = [
        { value: "funny", label: "Funny" },
        { value: "informative", label: "Informative" },
        { value: "sad", label: "Sad" },
        { value: "cute", label: "Cute" },
        { value: "general", label: "General" }, // একটি ডিফল্ট ট্যাগ
    ];

    const onSubmit = async (formData) => { // data কে formData রিনেম করা হলো স্পষ্টতার জন্য
        // selectedTag স্টেট এর বদলে Controller থেকে পাওয়া ভ্যালু ব্যবহার করা হবে
        const tags = formData.tag ? formData.tag.map(tag => tag.value) : []; // যদি isMulti হয়
        // যদি isMulti না হয়, তাহলে: const tag = formData.tag?.value || "general";

        const post = {
            authorImage: formData.authorImage, // defaultValues থেকে আসবে
            authorName: formData.authorName,   // defaultValues থেকে আসবে
            authorEmail: formData.authorEmail, // defaultValues থেকে আসবে
            title: formData.postTitle,
            description: formData.postDescription,
            tags: tags, // যদি একাধিক ট্যাগ হয়, "tags" অ্যারে হিসেবে পাঠান
            // tag: tag, // যদি single tag হয়, "tag" স্ট্রিং হিসেবে পাঠান
            upVote: formData.upVote,
            downVote: formData.downVote,
            createdAt: new Date().toISOString() // পোস্ট তৈরির সময়
        };

        try {
            await axios.post("http://localhost:3000/posts", post);
            toast.success('Post added successfully!');
            reset(); // ফর্ম রিসেট করুন
            refetch(); // পোস্ট কাউন্ট আপডেট করতে refetch করুন
            navigate("/dashboard/my-posts"); // my-posts পেজে রিডাইরেক্ট করুন
        } catch (error) {
            console.error("Error adding post:", error);
            toast.error('Failed to add post. Please try again.');
        }
    };

    // বর্তমান Firebase ইউজারের তথ্য, যদি AuthContext থেকে `user` আসে
    const currentUser = user;

    if (isPending) return <LoadingSpinner />;

    // নিশ্চিত করুন data এবং data.count আছে
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
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-8">
                <h2 className="text-4xl font-bold text-center mb-8">Add New Post</h2>

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
                            readOnly
                            {...register('authorName')} // defaultValues থেকে আসবে
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
                            readOnly
                            {...register('authorEmail')} // defaultValues থেকে আসবে
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
                            name="tag" // এই নামটিই onSubmit ডেটাতে key হিসেবে আসবে
                            control={control}
                            rules={{ required: 'Please select at least one tag' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={tagOptions}
                                    isMulti={true} // একাধিক ট্যাগ সিলেক্ট করার জন্য
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Select tags..."
                                    styles={{
                                        control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderColor: errors.tag ? 'red' : baseStyles.borderColor,
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
                            {...register('upVote')}
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
                            {...register('downVote')}
                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
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