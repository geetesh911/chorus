import React, { useRef, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import Slide from "@material-ui/core/Slide";
import { rightScroll } from "../../utils/scroll";
import { leftScroll } from "../../utils/scroll";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export const ShareModal = ({ open, share, setMsg, handleClose }) => {
  const textAreaRef = useRef(null);

  const sharePlatformButtons = [
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  ];

  const sharePlatformIcons = [
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon,
  ];

  const sharePlatformNames = [
    "Email",
    "Facebook",
    "LinkedIn",
    "Pinterest",
    "reddit",
    "Telegram",
    "Tumblr",
    "Twitter",
    "WhatsApp",
  ];

  const scrollLeft = (e, div) => {
    leftScroll(e, div, 230);
  };

  const scrollRight = (e, div) => {
    rightScroll(e, div, 230);
  };

  const handleCopyLink = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setMsg("Link Copied");
  };
  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        className={"shareModal"}
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle className="modalTitle" id="responsive-dialog-title">
          <p>Share</p>
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </DialogTitle>
        <div
          className="left-scroll"
          onClick={(e) => scrollLeft(e, "modalContent")}
        >
          <ArrowBackIosOutlinedIcon />
        </div>
        <DialogContent className="modalContent">
          <div className="main-content">
            <div className="buttonArea">
              {sharePlatformButtons.map((ShareButton, index) => (
                <div className="singleButton" key={`${index}${Math.random()}`}>
                  <ShareButton
                    url={share.link}
                    quote={share.title}
                    title={share.title}
                    className="modalShareButton"
                    media={share.image}
                    source={"melody"}
                  >
                    {sharePlatformIcons.map((ShareButtonIcon, i) => (
                      <Fragment key={`${i}${Math.random()}`}>
                        {index === i && <ShareButtonIcon />}
                      </Fragment>
                    ))}
                  </ShareButton>
                  {sharePlatformNames.map((name, i) => (
                    <Fragment key={`${name}${Math.random()}`}>
                      {index === i && <span className="name">{name}</span>}
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
        <div className="link">
          {share.link && (
            <input
              type="text"
              ref={textAreaRef}
              readOnly
              value={share.link || " "}
            />
          )}
          <span>
            <button className="copyButton" onClick={handleCopyLink}>
              Copy
            </button>
          </span>
        </div>
        <div
          className="right-scroll"
          onClick={(e) => scrollRight(e, "modalContent")}
        >
          <ArrowForwardIosIcon />
        </div>
      </Dialog>
    </div>
  );
};
