        // delete post
        app.delete("/posts/:id", async (req, res) => {
            const id = req.params.id;
            const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });
