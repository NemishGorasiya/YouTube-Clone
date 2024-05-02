import useLocalStorage from "../hooks/useLocalStorage";

const getUserFromLocalStorage = () => {
  const [user] = useLocalStorage("user", {});
  return user;
};

export default getUserFromLocalStorage;
