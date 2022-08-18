import { logoutUser } from "../../../js/services/authService";
import { UseStore } from "../../../js/services/context/storeContext";
import { LinkButtonOrangeBg } from "../../components/buttons";
import DropDownMenu from "../../components/dropDownMenu";

import userSVG from "../../../res/svg/userProfile.svg";

const UserMenu = () => {
  const { user } = UseStore();
  return user ? (
    <UserProfileButton username={user.name} />
  ) : (
    <LinkButtonOrangeBg href="/user/login" classNamme="">
      <span>Login / Register</span>
    </LinkButtonOrangeBg>
  );
};

const UserProfileButton = ({ username }) => {
  return (
    <DropDownMenu icon={userSVG} text={username}>
      <a href="/user/profile">Profile</a>
      <a href="/user/favorites">Favorites</a>
      <a onClick={() => logoutUser()}>Logout</a>
    </DropDownMenu>
  );
};

export default UserMenu;
