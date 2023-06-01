import { flow, types } from "mobx-state-tree";
import { packageApi } from "../../api";
import { catchError } from "@utils/common-functions";
import { categoriesDataModel, packagesModal } from "@stores/store-utils";
import { toJS } from "mobx";
import { notification } from "@utils/notifications";

export const packages = types

  .model({
    packagesData: types.maybeNull(types.array(packagesModal)),
    categoriesData: types.maybeNull(types.array(categoriesDataModel)),
    loadingPackages: types.optional(types.boolean, false),
    loadingCreatingPackages: types.optional(types.boolean, false),
    loadingGettingCategories: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get getPackagesData() {
      return toJS(self.packagesData);
    },
    get getCategoriesData() {
      return toJS(self.categoriesData);
    },
    get isLoadingPackages() {
      return toJS(self.loadingPackages);
    },
    get isLoadingCreatingPackages() {
      return toJS(self.loadingCreatingPackages);
    },
    get isLoadingGettingCategories() {
      return toJS(self.loadingGettingCategories);
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

    const loadCategories = flow(function* () {
      self.loadingGettingCategories = true;
      let response = null
      try {
        const res = yield packageApi?.getCategoriesData();
        self.categoriesData = res?.data
        response = res
      } catch (error) {
        catchError(error, "loadCategories");
        response = error
      } finally {
        self.loadingGettingCategories = false;
        return response
      }
    });

    return {
      loadPackages,
      createPackages,
      loadCategories
    };
  });

export function initPackages() {
  return packages.create({});
}
