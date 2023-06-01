import axios from "axios";
import { userLoginUrl } from "../const";
import { BaseApi } from "../baseApi";

class UserApi extends BaseApi {

  onUserLogin = async (data) => {
    try {
      const response = await axios.post(userLoginUrl, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
}

export default UserApi;
