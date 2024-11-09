import Search from "../models/search";

export const getData = async (req, res) => {
    try {
      const {limit = 10 ,search, page } = req.params;
      const data = await Search.find().limit(limit)
    return res
        .status(200)
        .json({
          status: "success",
          message: "data fetched successfully",
          data: data,
        });
    } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
    }
  };