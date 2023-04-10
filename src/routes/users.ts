const routerUser = require("express").Router();
const { setUser, getUser, getAllUsers, updateUser, deleteUser } = require("./controllers/users");

routerUser.post("/", async (req: any, res: any) => {
    try{
        const user = req.body;
        const response = await setUser(user);
        res.status(200).json(response);
    }catch(error: any){
        res.status(400).json({ error: error.message })
    }
});

routerUser.get("/", async (req: any, res: any) => {
    try{
        const response = await getAllUsers();
        res.status(200).json(response);
    }catch(error: any){
        res.status(400).json({ error: error.message })
    }
});

routerUser.patch("/", async (req: any, res: any) => {
    try{
        const userData = req.body;
        await updateUser(userData);
        res.status(200).json({ msg: "update user successfully" });
    }catch(error: any){
        res.status(400).json({ error: error.message })
    }
});

routerUser.delete("/:id", async (req: any, res: any) => {
    try{
        const { id } = req.params;
        console.log(id);
        await deleteUser(id);
        res.status(200).json({ msg: "deleted user successfully" });
    }catch(error: any){
        res.status(400).json({ error: error.message })
    }
});

module.exports = routerUser;