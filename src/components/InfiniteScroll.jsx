import { useCallback, useRef } from "react";
import "./InfiniteScroll.scss";
import Loader from "./loader/Loader";
import PropTypes from "prop-types";

const InfiniteScroll = ({
  items,
  renderItem,
  fetchMoreData,
  isLoading,
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
      {items.map((item, index) =>
        items.length === index + 1 ? (
          <div ref={lastUserRef} key={index}>
            {renderItem({
              ...item,
              ...props,
            })}
          </div>
        ) : (
          <div key={index}>
            {renderItem({
              ...item,
              ...props,
            })}
          </div>
        )
      )}
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
};

export default InfiniteScroll;
