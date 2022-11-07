const admin = require("../../firbaseConfig");
async function checkLogin(req, res, next) {
  try {
    const auth = req.headers.authorization;
    //console.log(auth);
    let token = auth.split(" ")[1];
    token = token.trim();

    //firebase admin decode
    const decoded = await admin.auth().verifyIdToken(token);
    //console.log(decoded);
    if (decoded) {
      req.user = decoded;

      next();
    } else {
      res.status({
        status: 401,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    res.json({
      status: "400",
      message: err.message,
    });
  }
}

module.exports = checkLogin;
