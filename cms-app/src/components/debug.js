function Debug({ children }) {
  if (process.env.NODE_ENV === 'development')
    return <div style={{ backgroundColor: 'gold', color: 'black' }}>{children}</div>;

  return <></>;
}

export default Debug;
