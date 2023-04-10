const { Users } = require("../../../db");

const setUser = async (user) => {
  if (!user.rol) throw new Error("missing parameter (rol)");
  if (!user.name) throw new Error("missing parameter (name)");
  if (!user.userName) throw new Error("missing parameter (userName)");
  if (!user.email) throw new Error("missing parameter (email)");
  if (!user.password) throw new Error("missing parameter (password)");

  const alreadyUser = await Users.findOne({
    where: { userName: user.userName },
  });
  if (alreadyUser) throw new Error("user already exists");

  const alreadyEmail = await Users.findOne({
    where: { userName: user.email },
  });
  if (alreadyEmail) throw new Error("user already exists");

  const newUser = await Users.create(user);
  return newUser;
};

const getUser = async (name, value) => {
  if (!name || !value) throw new Error("missing parameter");

  const user = await Users.findOne({
    where: { [name]: value },
  });

  return user;
};

const getAllUsers = async () => {
  const allUsers = await Users.findAll();

  return allUsers;
};

const updateUser = async (updateUser) => {
  const rol = ["Admin", "Contador"];

  if (!updateUser.userName) throw new Error("missing 'userName' parameter");
  if (!updateUser.name) throw new Error("missing 'name' parameter");
  if (!updateUser.password) throw new Error("missing 'password' parameter");
  if (!updateUser.rol) throw new Error("missing 'rol' parameter");

  if (!rol.includes(updateUser.rol)) throw new Error("invalid rol");

  const user = await Users.findOne({
    where: { id: updateUser.id },
  });

  if (!user) throw new Error("user not found");

  user.update(updateUser);
};

const deleteUser = async (id) => {
  const user = await Users.findOne({
    where: { id: id },
  });

  user.destroy();
};

module.exports = {
  setUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
