import { UseStore } from "../../../js/services/context/storeContext";

import SVG from "../../../res/svg/notification.svg";

const NotificationDropDown = () => {
  const { mail } = UseStore();
  const mailCount = mail ? mail.length : 0;
  return (
    <a href="/user/checkout" className="navItem cart">
      <img className="icon" src={SVG} alt="" />
      <span className="cartItemCount">
        {mailCount <= 99 ? mailCount : "+99"}
      </span>
    </a>
  );
};
export default NotificationDropDown;
