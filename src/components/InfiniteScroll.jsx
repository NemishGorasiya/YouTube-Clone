import React, { useCallback, useRef } from "react";
import "./InfiniteScroll.scss";
import Loader from "./loader/Loader";
import PropTypes from "prop-types";

const InfiniteScroll = ({
  items,
  renderItem,
  fetchMoreData,
  isLoading,
  children,
}) => {
  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchMoreData, isLoading]
  );

  const renderChildren = () => {
    console.log(children);
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        ref: lastUserRef,
        id: "123",
      });
    });
  };

  return renderChildren();
  // <>
  //   {/* {items.map(
  //     (item, index) =>
  //       items.length === index + 1
  //         ? // <div ref={lastUserRef} key={index}>
  //           // renderItem({
  //           //   ...item,
  //           // })
  //           renderChildren(item)
  //         : // </div>
  //           // <div key={index}>
  //           // renderItem({
  //           //   ...item,
  //           // })
  //           // </div>
  //         )} */}
  //   {isLoading && (
  //     <div className="loaderWrapper">
  //       <Loader />
  //     </div>
  //   )}
  // </>
};

InfiniteScroll.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  fetchMoreData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default InfiniteScroll;
