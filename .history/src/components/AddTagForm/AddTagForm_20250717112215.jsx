import React, { useState } from "react";
import Swal from "sweetalert2";

const AddTagForm = () => {
    const [tag, setTag] = useState("");
    const axiosSecure = useAxioss();

    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!tag.trim()) return;
        try {
            const res = await axiosSecure.post("/tags", { tag });
            if (res.data.insertedId) {
                Swal.fire("Success", "Tag added successfully", "success");
                setTag("");
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <form onSubmit={handleAddTag} className="mt-8 text-center">
            <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Add new tag"
                className="input input-bordered w-1/2"
            />
            <button type="submit" className="btn btn-primary ml-2">
                Add Tag
            </button>
        </form>
    );
};

export default AddTagForm;
