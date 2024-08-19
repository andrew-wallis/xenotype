import { useEffect, useState } from "react";
import About from "../About/About";
import GetFonts from "../GetFonts/GetFonts";


function Modal({modal, setModal, data}) {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(modal !== undefined && Object.keys(modal).length > 0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [modal]);

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
    setTimeout(() => {
      setModal({});
    }, 300);
  }

  const handleWrapperClick = (e) => {
    if(e.target.id === "#modal-wrapper") {
      closeModal(e);
    }
  }

  return (
    <>
      <div id="#modal-wrapper" className={`fixed inset-0 z-50 flex items-center justify-center py-16 transition-all duration-300 ease-out ${showModal ? "translate-y-0" : "-translate-y-full"}`} onClick={handleWrapperClick}>
        <div id="#modal" className={`h-full bg-white w-full max-w-3xl mx-auto`}>
          {(modal && modal.type === "About") &&
            <About font={modal.content} action={modal.action} close={closeModal} sites={data.sites} />
          }
          {(modal && modal.type === "GetFonts") &&
            <GetFonts content={modal.content} close={closeModal} action={modal.action} />
          }
        </div>
      </div>
      <div className={`fixed inset-0 z-40 ${showModal ? "opacity-100 translate-y-0" : "-translate-y-full opacity-0"}`}>
        <div className={`absolute inset-0 z-30 bg-gray-200 duration-300 transition-opacity ease-out ${showModal ? "opacity-50" : "opacity-0"}`}></div>
        <div className={`absolute inset-0 z-30 backdrop-blur-lg duration-300 transition-opacity ease-out ${showModal ? "opacity-100" : "opacity-0"}`}></div>
      </div>
    </>
  )
};

export default Modal;