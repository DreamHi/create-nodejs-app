exports.send = (req, res, err, result) => {
  if (err) {
    res.status(err.status).json({ success: false, errorCode: err.status, errorMessage: err.message});
  } else {
    res.json({ success: true, data: result });
  }
};