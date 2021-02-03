const User = require("../models/user")
const bcrypt = require("bcrypt")
const app = require("../app")
const api = require("supertest")(app)

const deleteUsers = async () => await User.deleteMany({})

const createUser = async (payload) =>
  await api.post("/api/users").send(payload).expect(200)

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const loginUser = async (payload) => {
  const response = await api.post("/api/login").send(payload).expect(200)
  return response.body.token
}
module.exports = { createUser, usersInDb, deleteUsers, loginUser }
