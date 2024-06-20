import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      console.log(char)
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])




  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(Password);
  }, [Password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-3xl text-white font-semibold justify-center flex mx-auto'>Password Generator</h1>
        <div className='flex shadow rounded-lg p-4 overflow-hidden mb-4'>
          <input type='text'
            placeholder='Enter Password Length'
            className='w-full outline-none px-3 py-1'
            value={Password}
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='bg-blue-500 text-black p-2'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input type="range"
              min={6}
              max={24}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length:{length}</label>
          </div >
          <div className='flex item-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={numberAllowed}
              id="numberInput"

              onChange={() => {
                setNumberAllowed((prev) => !prev);

              }}>
            </input>
            <label>Include Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={charAllowed}
              id="charInput"

              onChange={() => {
                setCharAllowed((prev) => !prev);

              }}>
            </input>
            <label>include characters</label>
          </div>
        </div>
        <div>

        </div>

      </div>
    </>
  )
}

export default App
