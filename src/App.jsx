import { useState } from "react";
import Window from "./Window";
import Modal from "./Components/Modules/Modal/Modal";

function App({data}) {

  const [modal, setModal] = useState({label: "Hi"});

  return (
    <>
      <Window data={data} setModal={setModal} />
      <Modal modal={modal} setModal={setModal} data={data} />
    </>
  );
}

export default App;