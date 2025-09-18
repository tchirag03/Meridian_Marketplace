import Store from "../models/store.model.js";
import { generateKeywords } from "../utils/keywordUtils.js";

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

export const searchStores = async (req, res) => {
  const searchString = req.query.q;
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
      isActive: true,
      keywords: { $in: searchKeywords },
    };

    // Find ALL stores matching the query, without skip or limit
    const stores = await Store.find(query).populate("owner", "name");

    // Send the simplified response
    res.status(200).json({
      message: `Found ${stores.length} stores matching your search.`,
      data: stores,
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
