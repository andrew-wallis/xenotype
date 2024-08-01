import { useState } from "react";
import Window from "./Window";
import Modal from "./Components/Modules/Modal/Modal";

function App({data}) {

  //const [modal, setModal] = useState({});

  return (
    <div className="relative">
      <Window data={data} />
    </div>
  );
}

export default App;