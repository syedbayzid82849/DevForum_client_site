import React, { useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // or your axios hook
import LoadingSpinner from "../Shared/LoadingSpinner"; // optional

const AddPost = () => {
    const axiosSecure = useAxiosSecure();

    // Step 1: Fetch tags from backend
    const { data: allTags = [], isLoading: loadingTags } = useQuery({
        queryKey: ['allTags'],
        queryFn: async () => {
            const res = await axiosSecure.get("/tags");
            return res.data;
        },
    });

    // Step 2: Convert fetched tags into react-select options
    const tagOptions = allTags.map(item => ({
        value: item.tag,
        label: item.tag.charAt(0).toUpperCase() + item.tag.slice(1),
    }));

    // Step 3: State for selected tags
    const [selectedTags, setSelectedTags] = useState([]);

    // Step 4: Handle tag change
    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions || []);
    };

    // Optional: Loading spinner
    if (loadingTags) return <LoadingSpinner />;

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Create a Post</h2>

            {/* Tag Select Field */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Select Tags</label>
                <Select
                    options={tagOptions}
                    isMulti
                    onChange={handleTagChange}
                    value={selectedTags}
                    className="text-black"
                    placeholder="Choose tags..."
                />
            </div>

            {/* Submit and other form inputs go here */}
        </div>
    );
};

export default AddPost;
