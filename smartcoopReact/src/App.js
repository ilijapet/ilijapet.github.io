import EntryPoint from "./components/EntryPoint";
import BecomeMember from "./components/BecomeMember";
import smartCoopLogo from "./assets/noun_raspberry_4132882_mala.svg";

function App() {
  return (
    <>
      <h1>
        <img src={smartCoopLogo} />
      </h1>
      <h1>SmartCOOP</h1>
      <h1>smart contract based agricultural cooperative</h1>
      <div>
        <BecomeMember />
        <EntryPoint />
      </div>
    </>
  );
}

export default App;
