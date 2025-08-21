export default function ConversationFooter({ onSubmit, onChange, msg }) {
  return (
    <footer className="chat-footer">
      <form onSubmit={onSubmit}>
        <label htmlFor="text"></label>
        <input
          placeholder="type a message"
          type="text"
          name="text"
          id="text"
          value={msg.text}
          onChange={onChange}
        />
        <button type="submit">send</button>
      </form>
    </footer>
  )
}
