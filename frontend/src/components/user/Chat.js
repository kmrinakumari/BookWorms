import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"

const Chat = () => {
  const [messageList, setMessageList] = useState(["Hi", "Hello", "Nice", "See You"])

  const [msgText, setMsgText] = useState("")

  const addMessage = () => {
    setMessageList([...messageList, msgText])
  }

  const displayMessages = () => {
    return messageList.map((msg) => (
      <motion.div
        initial={{ scale: 0.6, x: "800%", opacity: 0 }}
        animate={{ scale: 1, x: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="msg">
        <p>{msg}</p>
      </motion.div>
    ))
  }

  return (
       

    <div className="chat-bg">
      <div className="col-md-6 mx-auto pt-5">
        <div className="container">
          <h1 className="text-center mb-5"><b>Chat</b></h1>
          
        <div className="msg-area">{displayMessages()}</div>

        <div className="input-group mt-4">
          <input
            className="form-control"
            onChange={(e) => {
              setMsgText(e.target.value)
            }}
          />
          <button className="btn btn-primary" onClick={addMessage}>
            <i className="fas fa-plus-circle"></i> Send
          </button>
        </div>
      </div>
      </div>
          </div>
   
  )
}

export default Chat