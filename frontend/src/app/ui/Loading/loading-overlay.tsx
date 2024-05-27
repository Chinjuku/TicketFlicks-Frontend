// Loading.tsx
import React from 'react';
import {Spinner} from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="z-[9999] fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center" style={
      { backgroundColor: "rgba(0, 0, 0, 0.7)" }
    }>
      <Spinner color="secondary" labelColor="secondary"/>
    </div>
  );
};

export default Loading;
