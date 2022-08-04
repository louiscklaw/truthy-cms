function Debug({ children }) {
  if (process.env.NODE_ENV === 'development') return <>{children}</>;

  return <></>;
}

export default Debug;
