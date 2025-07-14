import { ThumbUpIcon, ChatAltIcon, ShareIcon, ThumbDownIcon } from '@heroicons/react/outline';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const PostCard = ({ post }) => {
    console.log(post);
    const { user } = useContext(AuthContext);
    console.log(user);
    const [upVoteCount, setUpVoteCount] = useState(post.upVote?.length || 0);
    const [downVoteCount, setDownVoteCount] = useState(post.downVote?.length || 0);
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    console.log(showModal);

    const handleUpVote = async () => {
        console.log('ok');
        if (!user) return;
        try {
            await axiosSecure.put(`/posts/upvote/${post._id}`, { userId: user.uid });
            setUpVoteCount(prev => prev + 1);
            setDownVoteCount(prev => Math.max(0, prev - (post.downVote?.includes(user.uid) ? 1 : 0)));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownVote = async () => {
        if (!user) return;
        try {
            await axiosSecure.put(`/posts/downvote/${post._id}`, { userId: user.uid });
            setDownVoteCount(prev => prev + 1);
            setUpVoteCount(prev => Math.max(0, prev - (post.upVote?.includes(user.uid) ? 1 : 0)));
        } catch (err) {
            console.error(err);
        }
    };
    return (
<></>
    );
};

export default PostCard;
