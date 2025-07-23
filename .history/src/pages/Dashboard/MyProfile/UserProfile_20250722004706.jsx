import { useContext, useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        photoURL: "",
        aboutMe: "",
        twitter: "",
        linkedin: "",
        github: "",
    });

    // Fetch user from DB
    const { data: dbUser = {} } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    console.log(dbUser);

    // Set modal form with current user data
    const handleEditClick = () => {
        setFormData({
            name: dbUser?.name || user?.displayName || "",
            photoURL: dbUser?.photoURL || user?.photoURL || "",
            aboutMe: dbUser?.aboutMe || "",
            twitter: dbUser?.twitter || "",
            linkedin: dbUser?.linkedin || "",
            github: dbUser?.github || "",
        });
        setShowModal(true);
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put(`/users/${dbUser._id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userProfile"]);
            Swal.fire("Updated!", "Profile updated successfully.", "success");
            setShowModal(false);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    // Badge logic
    const badge =
        dbUser?.'import { useContext, useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        photoURL: "",
        aboutMe: "",
        twitter: "",
        linkedin: "",
        github: "",
    });

    // Fetch user from DB
    const { data: dbUser = {} } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    console.log(dbUser);

    // Set modal form with current user data
    const handleEditClick = () => {
        setFormData({
            name: dbUser?.name || user?.displayName || "",
            photoURL: dbUser?.photoURL || user?.photoURL || "",
            aboutMe: dbUser?.aboutMe || "",
            twitter: dbUser?.twitter || "",
            linkedin: dbUser?.linkedin || "",
            github: dbUser?.github || "",
        });
        setShowModal(true);
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put(`/users/${dbUser._id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["userProfile"]);
            Swal.fire("Updated!", "Profile updated successfully.", "success");
            setShowModal(false);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    // Badge logic
    const badge =
        dbUser?.role === "member"
            ? { label: "Gold", icon: "/src/assets/gold-Badge.png" }
            : { label: "Bronze", icon: "/src/assets/bronze-Badge.png" };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">

            <div className="bg-base-100 p-6">
                <img
                    src={dbUser?.photoURL || user?.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary text-center"
                />
                <h2 className="text-2xl font-bold text-center">
                    {dbUser?.name || user?.displayName}
                </h2>
                <p className="text-gray-600 text-center">{dbUser?.email || user?.email}</p>

                {/* Badge */}
                <div className="flex justify-center items-center gap-2 my-4 text-center">
                    <img src={badge.icon} alt="badge" className="w-6 h-6" />
                    <span className="text-sm font-semibold">{badge.label} Badge</span>
                </div>

                {/* About Me */}
                <div className="mt-4 border w-xl h-3xl">
                    <h4 className="font-semibold">About Me:</h4>
                    {dbUser?.aboutMe && (
                        <p className="text-gray-500">{dbUser.aboutMe}</p>
                    )}
                </div>


                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-4">
                    {dbUser?.twitter && (
                        <a
                            href={dbUser.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Twitter
                        </a>
                    )}
                    {dbUser?.linkedin && (
                        <a
                            href={dbUser.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            LinkedIn
                        </a>
                    )}
                    {dbUser?.github && (
                        <a
                            href={dbUser.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            GitHub
                        </a>
                    )}
                </div>

                {/* Edit Button */}
                <button
                    className="btn btn-outline btn-primary mt-6"
                    onClick={handleEditClick}
                >
                    Edit Profile
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-center">
                            Update Profile
                        </h3>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="photoURL"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                value={formData.photoURL}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="aboutMe"
                                placeholder="About Me"
                                className="textarea textarea-bordered"
                                value={formData.aboutMe}
                                onChange={handleChange}
                            ></textarea>
                            <input
                                type="url"
                                name="twitter"
                                placeholder="Twitter URL"
                                className="input input-bordered"
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                className="input input-bordered"
                                value={formData.linkedin}
                                onChange={handleChange}
                            />
                            <input
                                type="url"
                                name="github"
                                placeholder="GitHub URL"
                                className="input input-bordered"
                                value={formData.github}
                                onChange={handleChange}
                            />
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline btn-error"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;'const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require("mongodb");
const Stripe = require("stripe");
const jwt = require("jsonwebtoken");
var admin = require("firebase-admin");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 3000;

// middleware
// ✅ Proper CORS setup (for withCredentials)
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions)); // apply cors
app.use(express.json());


const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ev6secp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const db = client.db("pawfect-project-db");
        const usersCollection = db.collection("users");
        const postsCollection = db.collection("posts");
        const commentsCollection = db.collection("comments");
        const announcementsCollection = db.collection('announcements');
        const tagsCollection = db.collection("tags");
        const reportsCollection = db.collection("reports");

        // middleware 
        const verifyFbToken = async (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).send({ message: 'unauthorized access' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send({ message: 'unauthorized access' });
            }

            // verify the token 
            try {
                const decoded = await admin.auth().verifyIdToken(token);
                req.decoded = decoded;
                next();
            }
            catch (err) {
                return res.status(403).send({ message: 'forbidden access' })
            }
        }

        // my Post component 
        // user posts showing 
        app.get("/posts/user", verifyFbToken, async (req, res) => {
            const email = req.query.email;
            const posts = await postsCollection.find({ authorEmail: email }).toArray();
            res.send(posts);
        });

        // home page search by tags
        app.get("/posts/search", async (req, res) => {
            const tag = req.query.tag;
            console.log("Searching for tag:", tag);

            if (!tag) {
                return res.status(400).json({ message: 'Tag query parameter is required' });
            }

            try {
                const posts = await postsCollection.find({
                    tags: { $elemMatch: { $regex: tag, $options: 'i' } }
                }).toArray();

                console.log("Found posts:", posts);
                res.json(posts);
            } catch (error) {
                console.error("Search error:", error);
                res.status(500).json({ message: 'Server error' });
            }
        });


        // menage users component 
        // ➤ Search users by name (for Manage Users search box)
        app.get("/users/search", verifyFbToken, async (req, res) => {
            const name = req.query.name;
            try {
                const users = await usersCollection.find({
                    name: { $regex: name, $options: "i" } // case-insensitive partial match
                }).toArray();
                res.send(users);
            } catch (error) {
                res.status(500).send({ message: "Failed to search users" });
            }
        });
        // ➤ Make a user admin
        app.patch("/users/admin/:id", verifyFbToken, async (req, res) => {
            const id = req.params.id;
            try {
                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { role: "admin" } }
                );
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to make admin" });
            }
        });
        // remove admin 
        app.patch("/users/remove-admin/:id", verifyFbToken, async (req, res) => {
            const id = req.params.id;
            try {
                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $unset: { role: "" } } // role field remove
                );
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to remove admin" });
            }
        });

        // useUserRole hook component 
        app.get("/users/:email/role", verifyFbToken, async (req, res) => {
            const email = req.params.email;
            const user = await usersCollection.findOne({ email });
            res.send({ role: user?.role || 'user' });
        });


        //    Announcement add api 
        app.post("/announcements", async (req, res) => {
            const announcement = req.body;
            const result = await announcementsCollection.insertOne(announcement);
            res.send(result);
        });
        // GET all announcements
        app.get('/announcements', async (req, res) => {
            const result = await announcementsCollection.find().sort({ createdAt: -1 }).toArray();
            res.send(result);
        });

        // membership component 
        // === PAYMENT INTENT ===
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;

            if (!price || price <= 0) {
                return res.status(400).send({ message: 'Invalid price amount' });
            }

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: parseInt(price), // must be in cents
                    currency: 'usd',
                    payment_method_types: ['card'],
                });

                res.send({ clientSecret: paymentIntent.client_secret });
            } catch (error) {
                console.error('Stripe error:', error.message);
                res.status(500).send({ error: error.message });
            }
        });

        // === UPDATE USER BADGE AFTER SUCCESSFUL PAYMENT ===
        app.put('/users/badge/:email', verifyFbToken, async (req, res) => {
            const email = req.params.email;

            try {
                const result = await usersCollection.updateOne(
                    { email },
                    { $set: { badge: 'Gold' } },
                    { upsert: true }
                );

                res.send(result);
            } catch (error) {
                console.error('Update badge error:', error.message);
                res.status(500).send({ error: error.message });
            }
        });

        // Sort by popularity 
        app.get("/posts/popular", async (req, res) => {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;

            try {
                const total = await postsCollection.countDocuments();

                const posts = await postsCollection.aggregate([
                    {
                        $addFields: {
                            voteDifference: {
                                $subtract: [
                                    { $size: { $ifNull: ["$upVote", []] } },
                                    { $size: { $ifNull: ["$downVote", []] } }
                                ]
                            },
                            createdAtDate: {
                                $toDate: "$createdAt"
                            }
                        }
                    },
                    { $sort: { voteDifference: -1, createdAtDate: -1 } },
                    { $skip: skip },
                    { $limit: limit }
                ]).toArray();

                res.send({
                    posts,
                    totalPages: Math.ceil(total / limit),
                    currentPage: page
                });
            } catch (err) {
                console.error("Popular posts error:", err);
                res.status(500).send({ message: "Failed to fetch post" });
            }
        });

        // get all posts with pagination
        app.get("/posts", async (req, res) => {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;

            try {
                const total = await postsCollection.countDocuments();
                const posts = await postsCollection.find({})
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 }) // latest post first
                    .toArray();

                res.send({
                    posts,
                    totalPages: Math.ceil(total / limit),
                    currentPage: page
                });
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: "Failed to load posts" });
            }
        });
        // show posts details by id 
        app.get("/posts/:id", verifyFbToken, async (req, res) => {
            const id = req.params.id;
            try {
                const post = await postsCollection.findOne({ _id: new ObjectId(id) });
                res.send(post);
            } catch (err) {
                res.status(500).send({ message: "Failed to fetch post" });
            }
        });


        // Home layouts 


        //showing all tags section form all posts 
        app.get("/tags", async (req, res) => {
            try {
                const tags = await tagsCollection.find().toArray();
                res.send(tags);
            } catch (error) {
                res.status(500).json({ message: "Failed to fetch tags" });
            }
        });


        // Add post component
        // check user how many posts he has
        app.get("/posts/count", verifyFbToken, async (req, res) => {
            const email = req.query.email;
            const count = await postsCollection.countDocuments({ authorEmail: email });
            res.send({ count });
        });

        // all post component 
        // all posts showing
        app.post("/posts", verifyFbToken, async (req, res) => {
            const post = req.body;
            post.upVote = [];
            post.downVote = [];
            post.commentCount = [];
            post.createdAt = new Date();
            const result = await postsCollection.insertOne(post);
            res.send(result);
        });

        // user id getting api by email
        app.get("/users/:email", verifyFbToken, async (req, res) => {
            const email = req.params.email;
            const user = await usersCollection.findOne({ email });
            res.send(user);
        });

        // my Post component 
        // delete post
        app.delete("/posts/:id", verifyFbToken, async (req, res) => {
            const id = req.params.id;
            const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        // when user click like button 
        app.put("/posts/upvote/:id", verifyFbToken, async (req, res) => {
            const postId = req.params.id;
            const { userId } = req.body;

            try {
                const post = await postsCollection.findOne({ _id: new ObjectId(postId) });

                const alreadyUpvoted = post.upVote.includes(userId);
                const alreadyDownvoted = post.downVote.includes(userId);

                if (alreadyUpvoted) {
                    return res.status(400).send({ message: "Already upvoted" });
                }

                const updateOps = [];

                // ✅ Remove from downVote if exists
                if (alreadyDownvoted) {
                    updateOps.push({
                        updateOne: {
                            filter: { _id: new ObjectId(postId) },
                            update: { $pull: { downVote: userId } }
                        }
                    });
                }

                // ✅ Add to upVote
                updateOps.push({
                    updateOne: {
                        filter: { _id: new ObjectId(postId) },
                        update: { $addToSet: { upVote: userId } }
                    }
                });

                await postsCollection.bulkWrite(updateOps);

                res.send({ message: "Upvoted successfully" });
            } catch (error) {
                console.error("Upvote error:", error);
                res.status(500).send({ message: "Upvote failed", error });
            }
        });

        // when user click dislike button
        app.put("/posts/downvote/:id", verifyFbToken, async (req, res) => {
            const postId = req.params.id;
            const { userId } = req.body;

            try {
                const post = await postsCollection.findOne({ _id: new ObjectId(postId) });

                const alreadyDownvoted = post.downVote.includes(userId);
                const alreadyUpvoted = post.upVote.includes(userId);

                if (alreadyDownvoted) {
                    return res.status(400).send({ message: "Already downvoted" });
                }

                const updateOps = [];

                // ✅ Always try to pull from upVote first if userId exists there
                if (alreadyUpvoted) {
                    updateOps.push({
                        updateOne: {
                            filter: { _id: new ObjectId(postId) },
                            update: { $pull: { upVote: userId } }
                        }
                    });
                }

                // ✅ Then add to downVote
                updateOps.push({
                    updateOne: {
                        filter: { _id: new ObjectId(postId) },
                        update: { $addToSet: { downVote: userId } }
                    }
                });

                await postsCollection.bulkWrite(updateOps);

                res.send({ message: "Downvoted successfully" });
            } catch (error) {
                console.error("Downvote error:", error);
                res.status(500).send({ message: "Downvote failed", error });
            }
        });

        // Sort by popularity 
        app.get("/posts/popular", async (req, res) => {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;

            try {
                const total = await postsCollection.countDocuments();

                const posts = await postsCollection.aggregate([
                    {
                        $addFields: {
                            voteDifference: { $subtract: [{ $size: "$upVote" }, { $size: "$downVote" }] }
                        }
                    },
                    { $sort: { voteDifference: -1, createdAt: -1 } },
                    { $skip: skip },
                    { $limit: limit }
                ]).toArray();

                res.send({
                    posts,
                    totalPages: Math.ceil(total / limit),
                    currentPage: page
                });
            } catch (err) {
                console.error("Popular posts error:", err);
                res.status(500).send({ message: "Failed to load popular posts" });
            }
        });

        // set a comment in mongodb 
        app.post("/comments", verifyFbToken, async (req, res) => {
            const comment = req.body;
            comment.createdAt = new Date();
            const result = await commentsCollection.insertOne(comment);
            res.send(result);
        });

        // comments delete by id 
        // DELETE /comments/:id
        app.delete('/comments/deleteComments/:id', async (req, res) => {
            const commentId = req.params.id;
            try {
                const commentResult = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });
                const reportResult = await reportsCollection.deleteOne({ commentId: commentId });

                res.send({
                    success: true,
                    message: 'Comment and related report deleted',
                    deletedComment: commentResult,
                    deletedReport: reportResult,
                });
            } catch (error) {
                res.status(500).send({ success: false, message: 'Failed to delete comment/report', error });
            }
        });


        // get all comments by post id
        app.get("/comments/:postId", verifyFbToken, async (req, res) => {
            const postId = req.params.postId;
            try {
                const comments = await commentsCollection
                    .find({ postId })
                    .sort({ createdAt: -1 })
                    .toArray();
                res.send(comments);
            } catch (err) {
                res.status(500).send({ message: "Failed to fetch comments" });
            }
        });

        // user data set by email, pass, google in db 
        // get all users
        app.get("/users", verifyFbToken, async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });
        // insert in users collection
        app.post("/users", verifyFbToken, async (req, res) => {
            const user = req.body;
            const existing = await usersCollection.findOne({ email: user.email });

            if (existing) {
                return res.send({ message: "User already exists" });
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // MY profile component
        // Get user by email
        app.get("/users/:email", verifyFbToken, async (req, res) => {
            const email = req.params.email;
            const user = await usersCollection.findOne({ email });
            res.send(user);
        });
        // Update user info
        app.put("/users/:id", verifyFbToken, async (req, res) => {
            const id = req.params.id;
            const { name, photoURL, aboutMe, twitter, linkedin, github } = req.body;

            const updateDoc = {
                $set: { name, photoURL, aboutMe, twitter, linkedin, github },
            };

            const result = await usersCollection.updateOne(
                { _id: new ObjectId(id) },
                updateDoc
            );
            res.send(result);
        });

        // add tags 
        app.post("/tags", async (req, res) => {
            const { tag } = req.body;

            if (!tag) {
                return res.status(400).send({ message: "Tag is required" });
            }

            try {
                const result = await tagsCollection.insertOne({ tag });
                res.send(result);
            } catch (error) {
                console.error("Add tag error:", error);
                res.status(500).send({ message: "Failed to add tag" });
            }
        });

        // how many have commends, post and users 
        app.get("/admin-stats", verifyFbToken, async (req, res) => {
            try {
                const [postsCount, commentsCount, usersCount] = await Promise.all([
                    postsCollection.estimatedDocumentCount(),
                    commentsCollection.estimatedDocumentCount(),
                    usersCollection.estimatedDocumentCount()
                ]);

                res.send({
                    posts: postsCount,
                    comments: commentsCount,
                    users: usersCount
                });
            } catch (error) {
                console.error("Admin stats error:", error);
                res.status(500).send({ message: "Failed to fetch admin stats" });
            }
        });

        // get all commends 
        app.get("/comments/:postId", async (req, res) => {
            const postId = req.params.postId;
            const comments = await commentsCollection.find({ postId }).toArray();
            res.send(comments);
        });

        // get all reports 
        app.get("/reports", async (req, res) => {
            try {
                const reports = await reportsCollection.find().toArray();
                res.send(reports);
            } catch (err) {
                res.status(500).send({ message: "Failed to fetch reports" });
            }
        });

        // delete report 
        app.delete("/reports/:id", async (req, res) => {
            const id = req.params.id;
            const result = await reportsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });


        // delete comment report by id 
        app.delete('/reports/:commentId', async (req, res) => {
            const commentId = req.params.commentId;
            try {
                const result = await reportsCollection.deleteOne({ commentId: commentId });
                res.send({ success: true, message: 'Report dismissed', result });
            } catch (error) {
                res.status(500).send({ success: false, message: 'Failed to dismiss report', error });
            }
        });

        // commends and report 
        app.patch("/comments/reports/:commentId", async (req, res) => {
            const commentId = req.params.commentId;
            const { feedback, reporterEmail } = req.body;

            const result = await reportsCollection.insertOne(
                {
                    commentId,
                    feedback,
                    reporterEmail
                }

            );

            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// root route
app.get("/", (req, res) => {
    res.send("Pet Delivery Server is Running");
});

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});'
name
"dff"
email
"cdfains828434464369@gmail.com"
role
"user"
badge
"Gold"
aboutMe
"vcx"
github
"http://localhost:5173/dashboard/my-profile"
linkedin
"http://localhost:5173/dashboard/my-profile"
photoURL
"http://localhost:5173/dashboard/my-profile"
twitter
"http://localhost:5173/dashboard/my-profile" ' gold and bronze  badge er kaj kora ki hoicay  === "gold"
            ? { label: "Gold", icon: "/src/assets/gold-Badge.png" }
            : { label: "Bronze", icon: "/src/assets/bronze-Badge.png" };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">

            <div className="bg-base-100 p-6">
                <img
                    src={dbUser?.photoURL || user?.photoURL}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary text-center"
                />
                <h2 className="text-2xl font-bold text-center">
                    {dbUser?.name || user?.displayName}
                </h2>
                <p className="text-gray-600 text-center">{dbUser?.email || user?.email}</p>

                {/* Badge */}
                <div className="flex justify-center items-center gap-2 my-4 text-center">
                    <img src={badge.icon} alt="badge" className="w-6 h-6" />
                    <span className="text-sm font-semibold">{badge.label} Badge</span>
                </div>

                {/* About Me */}
                <div className="mt-4 border w-xl h-3xl">
                    <h4 className="font-semibold">About Me:</h4>
                    {dbUser?.aboutMe && (
                        <p className="text-gray-500">{dbUser.aboutMe}</p>
                    )}
                </div>


                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-4">
                    {dbUser?.twitter && (
                        <a
                            href={dbUser.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Twitter
                        </a>
                    )}
                    {dbUser?.linkedin && (
                        <a
                            href={dbUser.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            LinkedIn
                        </a>
                    )}
                    {dbUser?.github && (
                        <a
                            href={dbUser.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            GitHub
                        </a>
                    )}
                </div>

                {/* Edit Button */}
                <button
                    className="btn btn-outline btn-primary mt-6"
                    onClick={handleEditClick}
                >
                    Edit Profile
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-center">
                            Update Profile
                        </h3>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="photoURL"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                value={formData.photoURL}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="aboutMe"
                                placeholder="About Me"
                                className="textarea textarea-bordered"
                                value={formData.aboutMe}
                                onChange={handleChange}
                            ></textarea>
                            <input
                                type="url"
                                name="twitter"
                                placeholder="Twitter URL"
                                className="input input-bordered"
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                className="input input-bordered"
                                value={formData.linkedin}
                                onChange={handleChange}
                            />
                            <input
                                type="url"
                                name="github"
                                placeholder="GitHub URL"
                                className="input input-bordered"
                                value={formData.github}
                                onChange={handleChange}
                            />
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline btn-error"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;