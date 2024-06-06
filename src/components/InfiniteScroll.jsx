import { Fragment, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Loader from "./loader/Loader";
import { LoaderWrapper } from "./InfiniteScrollStyledComponents";

const InfiniteScroll = ({
  items,
  renderItem,
  fetchMoreData,
  isLoading,
  skeletonItem,
  numberOfSkeletonItems = 12,
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

      {/* skeleton */}
      {isLoading &&
        Array.from({ length: numberOfSkeletonItems }).map((_, idx) => (
          <Fragment key={idx}>{skeletonItem}</Fragment>
        ))}

      {/* loader */}
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
};

InfiniteScroll.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  fetchMoreData: PropTypes.func,
  isLoading: PropTypes.bool,
  skeletonItem: PropTypes.element,
  numberOfSkeletonItems: PropTypes.number,
};

export default InfiniteScroll;
