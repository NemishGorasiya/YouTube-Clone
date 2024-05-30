import { Fragment, useCallback, useRef } from "react";
import "./InfiniteScroll.scss";
import Loader from "./loader/Loader";
import PropTypes from "prop-types";

const InfiniteScroll = ({
  items,
  renderItem,
  fetchMoreData,
  isLoading,
  skeletonItem,
  numberOfSkeletonItems,
  ...props
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

  return (
    <>
      {items.map((item, index) => (
        <div ref={items.length === index + 1 ? lastUserRef : null} key={index}>
          {renderItem({
            ...item,
            ...props,
          })}
        </div>
      ))}
      {isLoading &&
        Array.from({ length: numberOfSkeletonItems }).map((_, idx) => (
          <Fragment key={idx}>{skeletonItem()}</Fragment>
        ))}
      {isLoading && (
        <div className="loaderWrapper">
          <Loader />
        </div>
      )}
    </>
  );
};

InfiniteScroll.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  fetchMoreData: PropTypes.func,
  isLoading: PropTypes.bool,
  skeletonItem: PropTypes.func,
  numberOfSkeletonItems: PropTypes.number,
};

export default InfiniteScroll;
