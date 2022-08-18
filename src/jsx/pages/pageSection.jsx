import "../../css/global.css";
import "../../css/pages/sections/common.css";
import "../../css/pages/home.css";
import { LinkButtonOrangeBg } from "../components/buttons";
const PageSection = ({
  title,
  seeMoreURL,
  children,
  headerBgColor,
  headerColor,
}) => {
  return (
    <div className="page-section">
      <header>
        <h2 className="section-title">{title || "not set"}</h2>
        <div className="section-see-more">
          {seeMoreURL && (
            <LinkButtonOrangeBg href={seeMoreURL}>
              <span style={{ fontSize: "0.8em" }}>See more</span>
            </LinkButtonOrangeBg>
          )}
        </div>
      </header>
      <div className="section-content">{children}</div>
    </div>
  );
};

export default PageSection;
