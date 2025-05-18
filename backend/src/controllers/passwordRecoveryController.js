import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ClientsModel from "../models/Clients.js";
import Employeemodel from "../models/Employees.js";
import { sendEmail, HTMLRecoveryEmail } from "../utils/passwordRecoveryEmail.js";
import { config } from "../config.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "Email is required" });

    let user;
    let userType;

    user = await ClientsModel.findOne({ email });
    if (user) {
      userType = "client";
    } else {
      user = await Employeemodel.findOne({ email });
      if (user) userType = "employee";
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const token = jwt.sign(
      { email, code, userType, verified: false },
      config.JWT.secret,
      { expiresIn: "15m" }
    );

    res.cookie("tokenRecoveryCode", token, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

   await sendEmail({
  email: email,
  subject: "Password Recovery Code",
  text: `Your verification code is: ${code}`,
  html: HTMLRecoveryEmail(code),
});

    res.status(200).json({ message: "Verification code sent to email" });

  } catch (error) {
    res.status(500).json({
      message: "Error sending verification code",
      error: error.message,
    });
  }
};

passwordRecoveryController.verifyCode = (req, res) => {
  const { code } = req.body;

  try {
    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }

    const token = req.cookies.tokenRecoveryCode;
    if (!token) {
      return res.status(401).json({ message: "Token is missing, unauthorized" });
    }

    const decoded = jwt.verify(token, config.JWT.secret);

    if (decoded.code !== code) {
      return res.status(401).json({ message: "Invalid verification code" });
    }

    const newToken = jwt.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "15m" }
    );

    res.cookie("tokenRecoveryCode", newToken, {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: "Code verified successfully" });

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired, please request a new code" });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

passwordRecoveryController.resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const token = req.cookies.tokenRecoveryCode;
    if (!token) {
      return res.status(401).json({ message: "Token is missing, unauthorized" });
    }

    const decoded = jwt.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.status(400).json({ message: "Código no verificado, no se puede reiniciar la contraseña" });
    }

    const { email, userType } = decoded;

    let user;
    if (userType === "client") {
      user = await ClientsModel.findOne({ email });
    } else if (userType === "employee") {
      user = await Employeemodel.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    let updatedUser;
    if (userType === "client") {
      updatedUser = await ClientsModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    } else if (userType === "employee") {
      updatedUser = await Employeemodel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }

    if (!updatedUser) {
      return res.status(500).json({ message: "User not updated" });
    }

    res.clearCookie("tokenRecoveryCode");
    res.status(200).json({ message: "Password cambiada :)" });

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired, please request a new code" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

export default passwordRecoveryController;


