const Url = require("../models/url.model");
const shortId = require("shortid");

module.exports.createUrl = async (req, res) => {
	try {
		const { longUrl } = req.body;

		if (!longUrl.startsWith("http") || !longUrl.startsWith("https")) return res.status(400).json({ message: "Invalid Url" });

		const baseUrl = process.env.BASE_URL;
		const urlExists = await Url.findOne({ longUrl });

		if (urlExists) return res.status(400).json({ message: "Url already exists" });

		const urlCode = shortId.generate();
		const shortUrl = `${baseUrl}/${urlCode}`;

		const urlData = new Url({ longUrl, shortUrl, urlCode, userId: req.user.id });
		const result = await urlData.save();

		return res
			.status(201)
			.json({ message: "Url created successfully!!!", shortId: urlCode, result, shortUrl });
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error!" });
	}
};

module.exports.getUrls = async (req, res) => {
	try {
		const response = await Url.find();
		return res.status(200).json({
			message: "Orders fetched successfully",
			result: response,
			status: true,
		});
	} catch (error) {
		return res.status(500).json({ status: false, message: "Internal Server Error!" });
	}
};

module.exports.getShortUrl = async (req, res) => {
	const { shortId } = req.params;
	try {
	  const url = await Url.findOne({ urlCode: shortId });
	  if (!url) {
		return res.status(404).json({ message: "URL not found" });
	  }
  
	  url.clicks++;
	  await url.save();
	//   res.redirect(url.longUrl);
	return res.status(200).json({
		status: true, 
	})
	} catch (err) {
	  res.status(500).json({ message: "Server error" });
	}
  };
