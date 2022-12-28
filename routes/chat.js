const express = require("express");
const Chat = require("../models/chat");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
async function getChat(req, res, next) {
    console.log(req.query.user, req.query.say)
    if(req.query.user && req.query.say){
        const c = new Chat({
            user: req.query.user,
            say: req.query.say
        });
        try{
            await c.save();
        } catch (err){
            res.status(400).json({ message: err.message });
        }
    }
    let chat;
    try {
        chat = await Chat.find({});
        if (chat == undefined) {
            return res.status(404).json({ message: "Can't find chat" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    // 如果有該事項 則將他加入到res中
    res.chat = chat;
    // 在router中執行middleware後需要使用next()才會繼續往下跑
    next();
}
async function rmv(req, res, next) {
    let chat;
    try {
        chat = await Chat.find({})
        if (chat == undefined) {
            return res.status(404).json({ message: "Can't find chat" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    // 如果有該事項 則將他加入到res中
    chat.remove()
    // 在router中執行middleware後需要使用next()才會繼續往下跑
    next();
}
router.get("/chat", getChat, async (req, res) => {
    res.send(res.chat);
});
router.get("/chat/clear", rmv, async (req, res) => {
    res.send("success");
});
router.get("/chat/save", async (req, res) => {
    res.send("success");
});
router.get("/chat/reload", getChat, async (req, res) => {
    res.send(res.chat);
});

module.exports = router;