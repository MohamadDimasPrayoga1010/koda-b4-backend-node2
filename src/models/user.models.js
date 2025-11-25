const users = [];

export function craeteUser(fullname, email, password){
  const user = {fullname, email, password}
  users.push(user)
  return user;
}

export function findUserByEmail(email){
  return users.find(user => user.email === email)
}


