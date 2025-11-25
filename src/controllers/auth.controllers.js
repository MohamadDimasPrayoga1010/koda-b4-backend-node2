import { craeteUser, findUserByEmail } from "../models/user.models.js";

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
export function register(req, res){
    const {fullname, email, password} = req.body
    const newUser = craeteUser(fullname, email, password)

    res.json({
        success: true,
        message: "Berhasil melakukan registrasi",
        data: newUser
    })
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
export function login(req, res) {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (user && user.password === password) {
    res.json({
      success: true,
      message: "Login berhasil",
      data: user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Email atau password salah",
    });
  }
}


