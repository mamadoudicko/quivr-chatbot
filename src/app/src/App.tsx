import { Dialog } from "@headlessui/react";
import { Layout } from "./Layout";
import { MessageBubble } from "./components/MessageBubble";
import { useApp } from "./hooks/useApp";

function App() {
  const {
    handleChange,
    handleClose,
    inputRef,
    inputValue,
    setShowModal,
    showModal,
    chatHistory
    ,handleSubmit
  } = useApp();

 

  return (
    <Layout setShowModal={setShowModal} showModal={showModal}>
      <div className="flex flex-row justify-between my-4">
        <Dialog.Title className="text-lg font-semibold text-center text-black">
          Assistant 🤖
          
        </Dialog.Title>
        <div>
          <button className="font-bold text-black" onClick={handleClose}>
            x
          </button>
        </div>
      </div>
    <div className="flex-1 overflow-scroll">
      {chatHistory.map((discussion) => (
        <>
          <MessageBubble
            key={discussion.message_id}
            message={discussion.user_message}
            sender={'user'}
          />
          <MessageBubble
            key={discussion.message_id}
            message={discussion.assistant}
            sender={'assistant'}
          />
        </>
      ))}
    </div>
    <div className="flex flex-col">
        <div className="flex flex-1">
          <div className="w-full align-start">
            <form onSubmit={e => {
              e.preventDefault();
              handleSubmit() ;
            }}>

            <input
              autoFocus
              type="text"
              required
              ref={inputRef}
              onChange={handleChange}
              placeholder="How may i help you?"
              value={inputValue}
              className="w-full mt-4 h-35 px-2 py-1 border border-gray-300 rounded bg-white text-black"
              />
              </form>
          
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
