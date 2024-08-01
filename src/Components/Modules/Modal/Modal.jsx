import { memo } from "react";
import About from "../About/About"

const Modal = memo(({showModal, aboutFont, closeModal, sites}) => {

  return (
    <>
      <div id="modal" className={`fixed inset-0 z-20 flex items-center justify-center py-16 transform transition-all duration-300 ${showModal ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
        <div className="h-full bg-white  max-w-3xl mx-auto">
          {Object.keys(aboutFont).length > 0 && <About font={aboutFont} closeModal={closeModal} sites={sites} />}
        </div>
      </div>
      <div id="modalOverlay" className={`fixed inset-0 z-10 bg-black transition-opacity duration-300 ${showModal ? "opacity-50 translate-y-0" : "opacity-0 -translate-y-full"}`}>
      </div>
    </>
  );
});

export default Modal;