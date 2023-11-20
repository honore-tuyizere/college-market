import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren, Fragment } from "react";

interface type {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  centered?: boolean;
  desc?: string;
  modalType?: "chat" | "normal" | "orderDetail";
}

const classNames = {
  title: { chat: "d-none", normal: "", orderDetail: "" },
  body: { chat: "pt-0", normal: "pt-6", orderDetail: "pt-6" },
  container: {
    chat: "p-0 w-[30rem]",
    normal: "p-4 w-[45rem]",
    orderDetail: "p-4 w-[30rem]",
  },
  panel: { chat: "p-0", normal: "p-6", orderDetail: "p-6" },
};

const Modal = (props: PropsWithChildren<type>) => {
  const { modalType, isOpen, onClose, desc, title, children, centered } = props;
  const type = modalType || "normal";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-100'
        style={{ zIndex: 999 }}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div
            className={`max-w-full flex ${
              centered ? "items-center" : ""
            } min-h-full items-start justify-center m-auto ${
              classNames.container[type]
            }`}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={`w-full rounded-md bg-white ${classNames.panel[type]}`}
              >
                {type != "chat" && (
                  <div className='flex justify-between'>
                    <div>
                      <Dialog.Title className='font-bold text-lg text-gray-900'>
                        {title}
                      </Dialog.Title>
                      {desc && (
                        <Dialog.Description className='font-thin text-xs text-gray-500'>
                          {desc}
                        </Dialog.Description>
                      )}
                    </div>
                    <div>
                      <XMarkIcon
                        className='w-7 rounded-md bg-gray-200 p-1.5 cursor-pointer'
                        onClick={() => onClose()}
                      />
                    </div>
                  </div>
                )}

                <div className={`${classNames.body[type]} rounded-md text-gray-700`}>
                  {type == "chat" && (
                    <>
                      <div className='absolute right-5 top-5 z-[101]'>
                        <XMarkIcon
                          className='w-7 rounded-md bg-gray-200 p-1.5 cursor-pointer'
                          onClick={() => onClose()}
                        />
                      </div>
                    </>
                  )}
                  <div className='relative'>{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
