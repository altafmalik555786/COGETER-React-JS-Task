import { flow, types } from "mobx-state-tree";
import { packageApi } from "../../api";
import { catchError } from "@utils/common-functions";
import { packagesModal } from "@stores/store-utils";
import { toJS } from "mobx";
import { notification } from "@utils/notifications";

export const packages = types

  .model({
    packagesData: types.maybeNull(types.array(packagesModal)),
    loadingPackages: types.optional(types.boolean, false),
    loadingCreatingPackages: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get getPackagesData() {
      return toJS(self.packagesData);
    },
    get isLoadingPackages() {
      return toJS(self.loadingPackages);
    },
    get isLoadingCreatingPackages() {
      return toJS(self.loadingCreatingPackages);
    },
  }))
  .actions((self) => {
    const loadPackages = flow(function* () {
      self.loadingPackages = true;
      try {
        const res = yield packageApi?.getPackageList();
        self.packagesData = res?.data;
      } catch (error) {
        catchError(error, "loadPackages");
      } finally {
        self.loadingPackages = false;
      }
    });

    const createPackages = flow(function* (data) {
      self.loadingCreatingPackages = true;
      let response = null
      try {
        const res = yield packageApi?.postPackageData(data);
        if (res?.statusCode === 200) {
          notification.success("Package created successfully");
          loadPackages()
        }
        response = res
      } catch (error) {
        catchError(error, "createPackages");
        response = error
      } finally {
        self.loadingCreatingPackages = false;
        return response
      }
    });

    return {
      loadPackages,
      createPackages,
    };
  });

export function initPackages() {
  return packages.create({});
}
