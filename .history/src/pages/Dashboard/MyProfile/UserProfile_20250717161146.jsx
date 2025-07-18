import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", photoURL: "" });

  const { data: userInfo = {} } = useQuery({
    queryKey: ["my-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const badge = userInfo?.badge === "gold" ? "🥇 Gold" : "🥉 Bronze";

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.put(`/users/${userInfo._id}`, {
        name: formData.name,
        photoURL: formData.photoURL,
      });
    },
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries(["my-profile", user?.email]);
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Update failed");
    },
  });

  const handleEdit = () => {
    setFormData({
      name: userInfo?.name || "",
      photoURL: userInfo?.photoURL || "",
    });
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <div className="flex items-center gap-4">
        <img src={userInfo?.photoURL || user?.photoURL} className="w-16 h-16 rounded-full" />
        <div>
          <p className="font-semibold">Name: {userInfo?.name || user?.displayName || "N/A"}</p>
          <p>Email: {userInfo?.email || user?.email}</p>
          <p>Badge: {badge}</p>
        </div>
      </div>

      <button className="btn btn-outline" onClick={handleEdit}>
        Edit Profile
      </button>

      {isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={formData.photoURL}
                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Update</button>
                <button onClick={() => setIsOpen(false)} className="btn btn-secondary">Close</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyProfile;
