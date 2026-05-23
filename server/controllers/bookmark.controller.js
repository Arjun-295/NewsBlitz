import Bookmark from "../models/Bookmark.js";

export const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.user.id });
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: "Failed to get bookmarks", error });
    }
}

export const toggleBookmark = async (req, res) => {
    const { title, url, urlToImage, source } = req.body;
    try {
        const existingBookmark = await Bookmark.findOne({
            userId: req.user.id,
            url
        });

        if (existingBookmark) {
            await existingBookmark.deleteOne();
            return res.json({ status: "removed", message: "Bookmark removed", existingBookmark });
        }

        const bookmark = new Bookmark({
            userId: req.user.id,
            title,
            url,
            urlToImage,
            source
        });

        await bookmark.save();
        res.json({ status: "added", bookmark });

    } catch (error) {
        res.status(500).json({ message: "Failed to toggle bookmark", error });
    }
}

export const deleteBookmark = async (req, res) => {
    const { id } = req.params;
    try {
        const bookmark = await Bookmark.findByIdAndDelete(id);
        if(!bookmark) {
            return res.status(404).json({ message: "Bookmark not found" });
        }
        return res.json({ message: "Bookmark deleted", bookmark });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete bookmark", error });
    }
}