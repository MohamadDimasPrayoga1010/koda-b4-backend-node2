import { craeteUser, findUserByEmail } from "../models/user.models.js";


export function register(req, res){
    const {fullname, email, password} = req.body
    const newUser = craeteUser(fullname, email, password)

    res.json({
        success: true,
        message: "Berhasil melakukan registrasi",
        data: newUser
    })
}

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
    res.json({
      success: false,
      message: "Email atau password salah",
    });
  }
}


