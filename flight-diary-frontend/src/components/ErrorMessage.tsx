const ErrorMessage = (props: { errorMessage: string | null }) => {
  const { errorMessage } = props;
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default ErrorMessage;
