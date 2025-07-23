import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const BannerSearch = ({ setSearchResult, setSearchLoading, setSearchError }) => {
    const axiosSecure = useAxiosSecure();
    const [inputValue, setInputValue] = useState("");

    const { data: searchData = [], isLoading, isError, error } = useQuery({
        queryKey: ["searchTags", inputValue],
        queryFn: async () => {
            if (!inputValue.trim()) return [];
            const res = await axiosSecure.get(`/posts?tags=${inputValue}`);
            return res.data;
        },
        enabled: !!inputValue.trim(),
    });

    useEffect(() => {
        setSearchResult(searchData);
        setSearchLoading(isLoading);
        setSearchError(isError ? error?.message : null);
    }, [searchData, isLoading, isError, error, setSearchResult, setSearchLoading, setSearchError]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex justify-center">
            <input
                type="text"
                placeholder="Search by tag..."
                className="input input-bordered w-full max-w-md"
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default BannerSearch;
