const uploadFile = (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded. Please attach a valid file." });
    }

    // Optional: Validate allowed MIME types (e.g., image or PDF)
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Invalid file type. Only JPEG, PNG, or PDF allowed." });
    }

    // Build file info object
    const fileInfo = {
      eventRelated: true,
      usage: "e.g., ticket, banner, promo", // you can adjust this dynamically based on endpoint later
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      sizeInKB: Math.round(req.file.size / 1024),
      type: req.file.mimetype,
      uploadTime: new Date(),
    };

    res.status(200).json({
      message: "Event file uploaded successfully!",
      file: fileInfo,
    });

  } catch (error) {
    console.error("Event File Upload Error:", error);
    res.status(500).json({
      message: "Failed to upload event file. Please try again.",
      error: error.message,
    });
  }
};

export { uploadFile };
