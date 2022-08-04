function Debug({ children }) {
  if (process.env.NODE_ENV === 'development') return <>{chidren}</>;

  return <></>;
}

export default Debug;
