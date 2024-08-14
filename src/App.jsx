import { useState, useCallback, useEffect } from "react";
import { useRef } from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [Password, setPassword] = useState("");

  const passwordref = useRef(null);

  const generatePassword = useCallback(() => {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+";

    let characters = alpha;
    if (numAllowed) {
      characters += numbers;
    }
    if (charAllowed) {
      characters += symbols;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(password);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(Password);
    passwordref.current?.select();
    alert("Password Copied");                                     
  }, [Password]);

  useEffect(() => {
    generatePassword();
  }, [setPassword, generatePassword , length, numAllowed, charAllowed]);

  return (
    <>
      <h1 className="text-[#C8D5B9] mb-[100px] font-bold text-3xl bg-[#52796F] p-5 rounded text-center uppercase tracking-widest font-poppins ">
        Password Generator
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center mb-5 text-[#52796F] font-poppins mt-50 font-semibold text-xl tracking-widest  p-10 pl-5 pr-5 bg-[#C8D5B9] rounded min-w-max text-center">
          <input type="text"
            ref={passwordref}
            placeholder="Password"
            value={Password}
            readOnly
            className="bg-[#f1f5f9] w-full text-center text-[#52796F] font-poppins font-semibold text-xl tracking-widest p-5 m-5 rounded-full"
          />

          <div className="flex flex-row">
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              onChangeCapture={(e) => setLength(e.target.value)}
              className="w-full cursor-pointer"
              />
              <label className="text-[#52796F] font-poppins font-semibold text-xl tracking-widest p-5">Length:{length}</label>
              
          </div>
          <div>
              <input type="checkbox" checked={numAllowed} onChange={() => setNumAllowed(!numAllowed)}/>
              <label className="text-[#52796F] font-poppins font-semibold text-xl tracking-widest p-5">Numbers</label>
              <input type="checkbox" checked={charAllowed} onChange={() => setCharAllowed(!charAllowed)}/>
              <label className="text-[#52796F] font-poppins font-semibold text-xl tracking-widest p-5">Symbols</label>
              </div>
          <div className="flex flex-row items-center">
            <button
              onClick={generatePassword}
              className="active:bg-[#0075FF] bg-[#52796F] text-[#C8D5B9] font-poppins font-semibold text-xl tracking-wide p-3 rounded-full mt-5 w-500 hover:scale-105"
            >
              Generate Password
            </button>
            <button onClick={copyPassword} className="active:bg-[#0075FF] bg-[#52796F] text-[#C8D5B9] font-poppins font-semibold text-xl tracking-widest p-3 rounded-full min-w-max mt-5 ml-5  hover:scale-105">
              Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
