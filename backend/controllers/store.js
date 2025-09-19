import Store from "../models/store.model.js";
import { generateKeywords } from "../utils/keywordUtil.js";

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find({ isActive: true })
      .populate("owner", "name")
      .sort({ createdAt: -1 });

    const totalStores = await Store.countDocuments({ isActive: true });

    res.status(200).json({
      message: "Stores fetched successfully",
      data: stores,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getTotalStores = async (req, res) => {
    try {
        const totalStores = await Store.countDocuments({ isActive: true });
        res.status(200).json({ totalStores });
    } catch (error) {
        console.error('Error getting total stores:', error);
        res.status(500).send('Server Error');
    }
};

export const getTopRatedStores = async (req, res) => {
    try {
        const topStores = await Store.find({ isActive: true })
            .sort({ rating: -1 })
            .limit(5)
            .select('storeName rating');
        res.status(200).json(topStores);
    } catch (error) {
        console.error('Error getting top rated stores:', error);
        res.status(500).send('Server Error');
    }
};

export const searchStores = async (req, res) => {
  const { searchString } = req.body;
  console.log(searchString)
  try {
    if (!searchString) {
      return res.status(400).json({ message: "Search keyword is required." });
    }
    const searchKeywords = generateKeywords(searchString);

    if (searchKeywords.length === 0) {
      return res
        .status(200)
        .json({ message: "No relevant keywords found in search.", data: [] });
    }
    // The query remains the same
    const query = {
      // isActive: true,
      keywords: { $in: searchKeywords },
    };

    // Find ALL stores matching the query, without skip or limit
    const stores = await Store.find(query).populate("owner", "name");
    console.log(stores);
    
    // Send the simplified response
    res.status(200).json({
      message: `Found ${stores.length} stores matching your search.`,
      stores,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @desc    Upload a logo or banner for the store
// @route   PATCH /api/stores/me/image
// @access  Private (Vendor)
export const uploadStoreImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const imageUrl = req.file.path;
    const { imageType } = req.body; // 'logo' or 'banner'

    let updateData = {};
    if (imageType === "logo") {
      updateData.logoUrl = imageUrl;
    } else if (imageType === "banner") {
      updateData.bannerUrl = imageUrl;
    } else {
      return res.status(400).json({ message: "Invalid image type specified." });
    }

    const store = await Store.findOneAndUpdate(
      { owner: req.user.id },
      { $set: updateData },
      { new: true }
    );

    res
      .status(200)
      .json({ message: `${imageType} uploaded successfully`, store });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const createStore = async (req, res) => {
  try {
    const { storeName, description } = req.body;
    const owner = req.user.id;

    // Check if a store already exists for this owner
    const existingStore = await Store.findOne({ owner });
    if (existingStore) {
      return res
        .status(400)
        .json({ message: "A store already exists for this user." });
    }

    const store = new Store({
      storeName,
      description,
      owner,
    });

    const savedStore = await store.save();

    res.status(201).json({
      message: "Store created successfully",
      store: savedStore,
    });
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).send("Server Error");
  }
};

export const updateMyStore = async (req, res) => {
  try {
    const { storeName, description } = req.body;

    const updateFields = {};
    if (storeName) updateFields.storeName = storeName;
    if (description) updateFields.description = description;


    const store = await Store.findOneAndUpdate(
      { owner: req.user.id },
      { $set: updateFields },
      { new: true, runValidators: true } // Return the updated doc and run schema validators
    );

    // Handle case where no store was found for that user
    if (!store) {
      return res
        .status(404)
        .json({ message: "Store not found for this user." });
    }

    res.status(200).json({
      message: "Store updated successfully",
      store: store,
    });
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).send("Server Error");
  }
};


export const getMyStore = async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id }).populate(
      "owner",
      "name"
    );

    if (!store) {
      return res.status(404).json({ message: "Store not found for this user" });
    }

    res.status(200).json({
      message: "Store fetched successfully",
      data: store,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
