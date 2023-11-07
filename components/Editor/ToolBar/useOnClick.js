const useOnClick = () => {
  const onClick = (event) => {
    console.log("event is ", event);
  };

  return { onClick };
};

export default useOnClick;
