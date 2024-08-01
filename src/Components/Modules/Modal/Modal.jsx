import { useEffect, useState } from "react";
import About from "../About/About";
import "./Modal.css"
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

  const closeModal = () => {

    setShowModal(false);

    setTimeout(() => {
      setModal({});
    }, 300);
    
  }

  return (
    <>
      <div className={`fixed inset-0 z-20 flex items-center justify-center py-16 transition-all duration-300 ease-out ${showModal ? "translate-y-0" : "-translate-y-full"}`}>
        <div className={`h-full bg-white w-full max-w-3xl mx-auto`}>
          {(modal && modal.type === "About") &&
            <About font={modal.content} action={modal.action} close={closeModal} sites={data.sites} />
          }
          {(modal && modal.type === "GetFonts") &&
            <GetFonts content={modal.content} close={closeModal} />
          }
        </div>
      </div>
      <div className={`fixed inset-0 z-10 bg-black duration-300 transition-opacity ease-out ${showModal ? "translate-y-0 opacity-50" : "-translate-y-full opacity-0"}`}></div>
    </>
  )
};

export default Modal;