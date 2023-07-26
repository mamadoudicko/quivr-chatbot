

export const MessageBubble = ({ message, sender } : {
    message: string;
    sender:'user' | 'assistant'
} ) => {

    if (message === '') return <div/>;

  const isUser = (sender === 'user');
  const align = isUser ? 'start' : 'end';
  const bubbleColor = isUser ? 'blue-500' : 'gray-200';
  const textColor = isUser ? 'white' : 'black';

  return (
    <div  style={{
        alignItems:`flex-${align}`
    }} className={`flex flex-col mb-3 ${isUser ? 'mr-10' : 'ml-10'}`}>
      <div
        className={`bg-${bubbleColor} text-${textColor} py-2 px-3 rounded-lg`}
      >
        {message}
      </div>
    </div>
  );
};
