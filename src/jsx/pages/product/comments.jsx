import { ButtonOrangeBg } from "../../components/buttons";
import PageSection from "../pageSection";

import pfpIMG from "../../../res/img/1.jpg";
const Comment = () => {
  return (
    <div className="comment-item">
      <img className="pfp" src={pfpIMG} alt="" />
      <div className="info">
        <div className="name">@hanter</div>
        <div className="comment">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis
          congue augue, in hendrerit lorem. Aenean egestas arcu metus. Ut ipsum
          purus, sagittis vitae convallis in, euismod sed nisi. Nunc faucibus
          nibh dui, non vulputate justo semper sed. Nam ut rhoncus turpis. Nunc
          elementum sed ante vel facilisis. Donec dictum placerat imperdiet.
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ prod_id }) => {
  return (
    <PageSection title={"comments (12)"} seeMoreURL="#">
      <Comment />
      <Comment />
      <div className="comment-input">
        <textarea placeholder="Share your opinion" type="text" />
        {<ButtonOrangeBg>Share</ButtonOrangeBg>}
      </div>
    </PageSection>
  );
};
export default CommentSection;
