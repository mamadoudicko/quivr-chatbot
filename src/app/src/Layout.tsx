import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'OPEN_EXTENSION') {
        setShowModal(true);
      }
    };

    window.addEventListener('message', handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);


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
          className='fixed right-0 bottom-0 z-50 overflow-y-auto'
        >
            <Dialog.Panel className="bg-white m-20 pt-0 shadow-2xl rounded-lg z-50 flex flex-col text-black flex flex-1 flex-col w-[400px] h-[600px] border-2 border-[#d1d1d1]">
              {
              children
              }
            </Dialog.Panel>
        </Dialog>
      </Transition>
    </div>
  );
};
