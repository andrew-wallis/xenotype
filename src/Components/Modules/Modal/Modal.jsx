import { useEffect, useState } from "react";
import About from "../About/About"

function Modal({modal, setModal}) {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(modal !== undefined && Object.keys(modal).length > 0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [modal]);


  return (
    <>
      <div id="modal" className={`fixed inset-0 z-20 flex items-center justify-center py-16 transform transition-all duration-1000 ${showModal ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
        <div className="h-full bg-white w-full max-w-3xl mx-auto">
          <div className="flex justify-end mb-8">
            <a href="#" onClick={(e) => {e.preventDefault(); setModal({})}} className="h-4 w-4 flex justify-center items-center">
              <span className="absolute bg-black h-[1.5px] w-3 rotate-45"></span>
              <span className="absolute bg-black h-[1.5px] w-3 -rotate-45"></span>
            </a>
          </div>
          {/* {Object.keys(aboutFont).length > 0 && <About font={aboutFont} closeModal={closeModal} sites={sites} />} */}

          {showModal && modal.label}
        </div>
      </div>
      <div id="modalOverlay" className={`fixed inset-0 z-10 bg-black transition-opacity duration-1000 ${showModal ? "opacity-50 translate-y-0" : "opacity-0 -translate-y-full"}`}>
      </div>
    </>
  );
};

export default Modal;