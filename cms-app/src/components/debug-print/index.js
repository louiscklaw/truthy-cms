import React from 'react';

function DebugPrint(children) {
  return <pre>{JSON.stringify(children, null, 2)}</pre>;
}

export default DebugPrint;
