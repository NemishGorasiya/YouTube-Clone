import { Fragment, useEffect } from "react";

const InfiniteScroll = ({ items, renderItem, fetchMoreData }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom) {
        fetchMoreData();
      }
    };

    // if (window.scrollY === 0) {
    //   handleScroll();
    // }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchMoreData]);

  return (
    <>
      {items.map((item, idx) => (
        <Fragment key={idx}>{renderItem(item)}</Fragment>
      ))}
    </>
  );
};

export default InfiniteScroll;
