import ChatMessage from './chat-message'

export default function ConversationChat({ conversation }) {
  return (
    <main className="chat">
      {conversation.map((msg) => (
        <ChatMessage key={msg.id} msg={msg} />
      ))}
    </main>
  )
}
