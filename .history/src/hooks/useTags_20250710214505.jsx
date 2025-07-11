import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTags = () => {
    const axiosPublic = useAxiosPublic();
    return useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await axiosPublic.get("/tags");
            return res.data;
        },
    });
};

export default useTags;
