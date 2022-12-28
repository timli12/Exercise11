const express = require("express");
const Chat = require("../models/chat");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
var chatRecords = [];
router.get("/chat", putChat, async (req, res) => {
    res.send(res.chat);
});
router.get("/chat/clear", async (req, res) => {
    chatRecords.length = 0;
});
router.get("/chat/save", async (req, res) => {
    for(let obj of chatRecords){
        try{
            await obj.save();
        } catch (err){
            res.status(400).json({ message: err.message });
        }
    }
});
async function putChat(req, res, next) {
    const chat = new Chat({
        user: req.body.user,
        say: req.body.say
    });
    chatRecords.push(chat);
    for(let obj of chatRecords){
        res.chat = obj;
        next();
    }
}
async function getChat(req, res, next) {
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
    res.chat = chat
    chatRecords.push(chat);
    // 在router中執行middleware後需要使用next()才會繼續往下跑
    next();
}
router.get("/chat/reload", getChat, async (req, res) => {
    res.send(res.chat);
});

module.exports = router;