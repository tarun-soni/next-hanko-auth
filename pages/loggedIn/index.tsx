import Image from 'next/image';
import React from 'react';

function LoggedIn() {
  return (
    <div
      style={{
        display: 'flex',
        margin: '0 auto auto 0',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>You are Logged In</h2>
    </div>
  );
}

export default LoggedIn;
