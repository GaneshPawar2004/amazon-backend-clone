import { getUserDashboardData, addToWishlistService, removeFromWishlistService} from '../services/index.js';

export const getUserDashboard = async (req, res) => {
    try {
        const data = await getUserDashboardData(req.user._id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addToWishlistController = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const updatedUser = await addToWishlistService(userId, productId);
        res.json({ message: 'Product added to wishlist', wishlist: updatedUser.wishlist });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const removeFromWishlistController = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const updatedUser = await removeFromWishlistService(userId, productId);
        res.json({ message: 'Product removed from wishlist', wishlist: updatedUser.wishlist });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};