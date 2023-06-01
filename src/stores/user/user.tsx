import { flow, types } from "mobx-state-tree";
import { userApi } from "../../api";
import { notification } from "../../utils/notifications";
import { constRoute } from "@utils/route";
import { catchError } from "@utils/common-functions";
import { userInfoModel } from "@stores/store-utils";
import { toJS } from "mobx";
import { JWT_AUTH_ACCESS_TOKEN } from "@utils/constants/important";
export const user = types

  .model({
    userInfo: types.maybeNull(userInfoModel),
    loading: types.optional(types.boolean, false),
    loadingLogin: types.optional(types.boolean, false),
    loadingCurrentUser: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get getUserInfo() {
      return toJS(self.userInfo);
    },
    get isLoadingLogin() {
      return toJS(self.loadingLogin);
    },
  }))
  .actions((self) => {
    const onUserLogin = flow(function* (data, navigate) {
      self.loadingLogin = true;
      try {
        const res = yield userApi?.onUserLogin(data);
        if (res?.statusCode === 200) {
          self.userInfo = res?.data;
          localStorage.setItem(JWT_AUTH_ACCESS_TOKEN, res?.data?.authToken);
          notification.success("Loged in successfully");
          navigate(`${constRoute.home}`);
        }
      } catch (error) {
        catchError(error, "onUserLogin");
      } finally {
        self.loadingLogin = false;
      }
    });

    return {
      onUserLogin,
    };
  });

export function initUser() {
  return user.create({});
}
