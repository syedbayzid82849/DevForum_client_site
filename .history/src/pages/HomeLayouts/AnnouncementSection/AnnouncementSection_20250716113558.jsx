import React from 'react';
import { FaBullhorn } from 'react-icons/fa';

const AnnouncementSection = () => {
    return (
        <div className="bg-yellow-100 max-w-7xl mx-auto border border-yellow-300 p-4 rounded-lg shadow-md mt-6">
            <div className="flex items-center mb-2">
                <FaBullhorn className="text-yellow-600 mr-2" />
                <h2 className="text-xl font-semibold text-yellow-800">Announcements</h2>
            </div>

            <ul className="list-disc pl-6 text-yellow-900 space-y-1">
                <li>🚀 Forum launching campaign starts tomorrow!</li>
                <li>🛠️ Maintenance will occur on 20th July from 1AM–3AM.</li>
                <li>🎉 Premium Membership now gives access to exclusive posts!</li>
                {/* <ul className="list-disc list-inside space-y-1">
                    {announcements.map((item) => (
                        <li key={item._id}>{item.title}</li>
                    ))}
                </ul> */}
            </ul>
        </div>
    );
};

export default AnnouncementSection;
