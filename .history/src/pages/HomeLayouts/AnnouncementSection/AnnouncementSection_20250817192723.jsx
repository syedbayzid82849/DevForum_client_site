// AnnouncementSection.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaBullhorn } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AnnouncementSection = () => {
    const axiosSecure = useAxiosSecure();

    const { data: announcements = [], isLoading, error } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data;
        },
    });


    if (isLoading) return <p className="text-center">Loading announcements...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load announcements.</p>;

    if (announcements.length === 0) return null; 

    return (
        <div id='announcement' className="bg-gray-800 text-amber-50 maxw7 border p-4 rounded-lg shadow-md mt-6">
            <div className="flex items-center mb-2">
                <FaBullhorn className="text-yellow-600 mr-2" />
                <h2 className="text-xl font-semibold text-yellow-800">Announcements</h2>
            </div>

            <ul className="list-disc pl-6 text-yellow-900 space-y-1">
                {announcements.map((item) => (
                    <li key={item._id}> {item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default AnnouncementSection;
