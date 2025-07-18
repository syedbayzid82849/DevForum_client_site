import React from "react";

const EditProfileModal = ({ formData, handleChange, handleSubmit, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-center">Update Profile</h3>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input type="text" name="name" placeholder="Full Name" className="input input-bordered" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered" value={formData.photoURL} onChange={handleChange} required />
                    <textarea name="aboutMe" placeholder="About Me" className="textarea textarea-bordered" value={formData.aboutMe} onChange={handleChange}></textarea>
                    <input type="url" name="twitter" placeholder="Twitter URL" className="input input-bordered" value={formData.twitter} onChange={handleChange} />
                    <input type="url" name="linkedin" placeholder="LinkedIn URL" className="input input-bordered" value={formData.linkedin} onChange={handleChange} />
                    <input type="url" name="github" placeholder="GitHub URL" className="input input-bordered" value={formData.github} onChange={handleChange} />
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-outline btn-error" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
