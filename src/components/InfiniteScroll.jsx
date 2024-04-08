import { useEffect } from "react";

const InfiniteScroll = () => {
  useEffect(() => {
    const handleScroll = () => {};

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return <div>InfiniteScroll</div>;
};

export default InfiniteScroll;
