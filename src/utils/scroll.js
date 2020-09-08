import $ from "jquery";

export const leftScroll = (event, className, scrollSpeed) => {
  event.preventDefault();
  className = className ? `.${className}` : ".items";
  $(className).animate(
    {
      scrollLeft: scrollSpeed ? `-=${scrollSpeed}` : "-=700px",
    },
    "slow"
  );
};

export const rightScroll = (event, className, scrollSpeed) => {
  event.preventDefault();
  className = className ? `.${className}` : ".items";
  $(className).animate(
    {
      scrollLeft: scrollSpeed ? `+=${scrollSpeed}` : "+=700px",
    },
    "slow"
  );
};
