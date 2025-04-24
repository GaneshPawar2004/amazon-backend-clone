import { getAdminStats } from '../services/adminService.js';

export const getAdminStatsController = async (req, res) => {
    try {
        const stats = await getAdminStats();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
    }
};
