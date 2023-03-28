import React, { PropsWithChildren } from 'react';

const ReziableContainer: React.FC<PropsWithChildren> = (props) => {
  return (
    // create a container for that adapts to the size of the window and the size of the content inside using tailwindcss
    // add minimum padding on mobile devices
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 ">
      {props.children}
    </div>
  );
};

export default ReziableContainer;
