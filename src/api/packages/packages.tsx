import axios from "axios";
import { getAllPackagesUrl } from "../const";
import { BaseApi } from "../baseApi";
import { getAuthorizationHeader } from "@api/common-utils";
import { posPackagesUrl } from "../const";

class PackageApi extends BaseApi {
  getPackageList = async () => {
    const data = {
      page: 1,
      limit: 4,
      categoryId: "",
      search: "",
      nearBy: {
        longitude: "34.2235677",
        latitude: "73.3346774",
        search: false,
      },
      price: {
        minPrice: 1,
        maxPrice: 10000,
      },
      sessions: {
        min: 1,
        max: 20,
      },
      gender: "",
      coachingType: "",
      locationType: "",
      languages: [],
    };
    try {
      const response = await axios.post(getAllPackagesUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  postPackageData = async (data) => {
    try {
      const response = await axios.post(posPackagesUrl, data, {
        headers: { Authorization: getAuthorizationHeader() },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default PackageApi;
