import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        category: { type: String },
        image: { type: String },
        countInStock: { type: Number, default: 0 },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                name: { type: String, required: true },
                rating: { type: Number, required: true },
                comment: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        rating: { type: Number, default: 0 },        // average rating
        numReviews: { type: Number, default: 0 },

    },
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);
