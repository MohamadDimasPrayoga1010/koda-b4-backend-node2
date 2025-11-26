import { error } from "console";
import { createUser, findUserByEmail } from "../models/user.models.js";

/**
 * POST /auth/register
 * @summary login user
 * @tags Auth
 * @param {object} request.body.required - Body request
 * @param  {string} fullname.form.required - fullname of user - application/x-www-form-urlencoded
 * @param  {string} email.form.required - Email of user - application/x-www-form-urlencoded
 * @param  {string} password.form.required - Password of user - application/x-www-form-urlencoded
 * @return {object} 200 - Sukses response
 * @return {object} 401 - email or password correct
 */
export async function register(req, res) {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }
    const newUser = await createUser(fullname, email, password);

    res.json({
      success: true,
      message: "Berhasil melakukan registrasi",
      data: newUser,
    });
  } catch (err){
    res.status(500).json({
      success: false,
      message: "Terjadi Kesalahan server",
      error: err.message
    })
  }
}

/**
 * POST /auth/login
 * @summary login user
 * @tags Auth
 * @param {object} request.body.required - Body request
 * @param  {string} email.form.required - Email of user - application/x-www-form-urlencoded
 * @param  {string} password.form.required - Password of user - application/x-www-form-urlencoded
 * @return {object} 200 - Sukses response
 * @return {object} 401 - email or password correct
 */
export async function login(req, res) {
  const { email, password } = req.body;
  
  try{
     const user = await findUserByEmail(email);

     if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    res.json({
      success: true,
      message: "Login berhasil",
      data: user,
    });
  }catch (err){
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
      error: err.message,
    })
  }
}
