import { Dialog } from "@headlessui/react";
import { Layout } from "./Layout";
import { Logo } from "./components/Logo";
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
    ,handleSubmit,
    generatingAnswer
    
  } = useApp();

 

  return (
    <Layout setShowModal={setShowModal} showModal={showModal}>
      <div className="flex px-6 pb-3 flex-row justify-between my-4 border-b-2 border-[#d1d1d1]">
        <div className="flex flex-row items-center">
          <Logo/>
          <Dialog.Title className="text-lg  font-semibold text-center text-black">
            Assistant 🤖
          </Dialog.Title>
        </div>
        <div>
          <button className="font-bold text-black" onClick={handleClose}>
            x
          </button>
        </div>
      </div>
    <div className="flex-1 overflow-scroll px-4">
      {chatHistory.map((discussion) => (
        <>
          <MessageBubble
            key={`${discussion.message_id}-user`}
            message={discussion.user_message}
            sender={'user'}
          />
          <MessageBubble
            key={`${discussion.message_id}-assistant`}
            message={discussion.assistant}
            sender={'assistant'}
          />
        </>
      ))}
    </div>
    {generatingAnswer && (
        <p className="px-6">
          Thinking...
      </p>)}
    <div className="flex flex-col px-4 border-t-2 border-[#d1d1d1]">
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
              className="w-full mt-4 px-2 py-2 border border-gray-300 rounded bg-white text-black"
              />
              </form>
          
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
