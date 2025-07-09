// AddPost.jsx
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";

const AddPost = () => {
    // const { register, handleSubmit,  } = useForm();
    const [selectedTag, setSelectedTag] = useState(null);

    const onSubmit = (data) => {
        const postData = {
            authorImage: "user_photo_url",
            authorName: "user_name",
            authorEmail: "user_email",
            title: data.title,
            description: data.description,
            tag: selectedTag?.value || "none",
            upVote: 0,
            downVote: 0,
        };

        console.log(postData);
        // reset();
    };

    const tagOptions = [
        { value: "funny", label: "Funny" },
        { value: "informative", label: "Informative" },
        { value: "sad", label: "Sad" },
        { value: "cute", label: "Cute" },
    ];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto space-y-4 p-6 bg-white rounded shadow"
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
                onChange={setSelectedTag}
                placeholder="Select Tag"
            />

            <button type="submit" className="btn btn-primary w-full">
                Console Post Data
            </button>
        </form>
    );
};

export default AddPost;
