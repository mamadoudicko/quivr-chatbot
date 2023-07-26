import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import FakeComponent from "./components/FakeComponent";

export type LayoutProps = {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  children: React.ReactNode;
};
export const Layout = ({
  setShowModal,
  showModal,
  children,
}: LayoutProps): JSX.Element => {
  return (
    <div >
      {process.env.NODE_ENV === "development" && (
        <FakeComponent />
      )}
      <Transition
        show={showModal}
        enter="transition duration-200 ease-out transform"
        enterFrom="translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-200 ease-out transform"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-full opacity-0"
        as={Fragment}
      >
        <Dialog
          onClose={() => setShowModal(false)}
          className='fixed right-0 bottom-0 z-50'
        >
            <Dialog.Panel className="bg-white m-20 p-6 pt-0 pb-3 shadow-md rounded-lg z-50 flex flex-col text-black flex flex-1 flex-col w-[400px] h-[600px]">
              {
              children
              }
            </Dialog.Panel>
        </Dialog>
      </Transition>
       <button
        className="fixed bottom-0 right-0 m-4 p-2 bg-black text-white rounded-full shadow-lg"
        onClick={() => setShowModal(true)}
      >
        Open chatbot
      </button>
    </div>
  );
};
