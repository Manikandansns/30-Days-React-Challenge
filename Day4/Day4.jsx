import React, { useState } from 'react';
import './Day4.css'; // Import your CSS file

const PasswordComponent = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="center">
      <div className="password">
        <input
          name="password"
          autoComplete="off"
          type={show ? "text" : "password"}
        />
        <button onClick={() => setShow(!show)}>
          {show ? <img src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/face-with-peeking-eye_1fae3.gif" alt="Open Eye" style={{ width: '24px', height: '24px' }} /> : <img src="https://em-content.zobj.net/source/telegram/358/face-with-peeking-eye_1fae3.webp" alt="Closed Eye" style={{ width: '24px', height: '24px' }} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordComponent;
