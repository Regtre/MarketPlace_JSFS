import axios from "axios";
import Cookies from "js-cookie";
const qs = require("qs");
const expire_time = 0.1;
const api = Cookies.withAttributes({
  path: "/",
  sameSite: "strict",
  secure: true,
});

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};
const burl = "http://localhost:8000";

const url = () => {
  return burl;
};

/**
 * Use to login with the cookies data
 * @param {String} pseudo user
 * @param {String} password user
 * @returns axios response
 */
const login = async (pseudo, password) => {
  const data = {
    pseudo,
    password,
  };
  return axios
    .post(`${burl}/users/login`, qs.stringify(data), {
      headers: headers,
    })
    .then((res) => {
      api.set("user", res.data.id, { expires: expire_time, secure: true });
      return res;
    })
    .catch((e) => e);
};
/**
 * Use to signup, by sending a axios request
 * @param {Object} send user data like this :
 * - pseudo
 * - password
 * - money
 * @returns axios response
 */
const signup = async (send) => {
  return axios
    .post(`${burl}/users/signup`, qs.stringify(send), {
      headers: headers,
    })
    .then((res) => {
      api.set("user", res.data.id, { expires: expire_time, secure: true });
      return res;
    })
    .catch((e) => e);
};
/**
 * Use to know if is authenticate
 * @returns Boolean
 */
const isAuth = () => {
  return api.get("user") !== undefined;
};
/**
 * Remove this cookie
 */
const logout = () => {
  api.remove("user");
};
/**
 * Use to get user id in this cookie
 * @returns the user id
 */
const getUserId = () => {
  return api.get("user");
};

/**
 * Creat a item in this data base
 * @param {Object} dataItem to creat
 * @returns Axios response
 */
const createItem = async (dataItem) => {
  dataItem.id_owner = api.get("user");
  return axios
    .post(`${burl}/items/create`, qs.stringify(dataItem), {
      headers: headers,
    })
    .then((res) => res)
    .catch((e) => e);
};

/**
 * Use to get the user's object
 * @returns A list of object of this user
 */
const getItemUser = async () => {
  return axios
    .get(`${burl}/items/self/${api.get("user")}`)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      return [];
    });
};

/**
 * Get other's items
 * @returns Return the list of other's items
 */
const getItemOther = async () => {
  return axios
    .get(`${burl}/items/other/${api.get("user")}`)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      return [];
    });
};

/**
 * Set money of this user
 * @param {Number} money change
 * @returns Axios's response
 */
const setMoney = async (money) => {
  return axios
    .put(
      `${burl}/users/wallet/${api.get("user")}`,
      qs.stringify({ money: money }),
      {
        headers: headers,
      }
    )
    .then((res) => res)
    .catch((e) => e);
};

const setSellItem = async (itemId, sell) => {
  return axios
    .put(`${burl}/items/sell/${itemId}`, qs.stringify({ sell }), {
      headers: headers,
    })
    .then((res) => res)
    .catch((e) => e);
};

/**
 * Buy this item, and take the money of this users and add money to the user's item
 * @param {Object} item buy
 * @returns the change with the sell part of this item
 */
const buyItem = async (item) => {
  axios
    .get(`${burl}/users/find/${item.id_owner}`)
    .then((e) => {
      let argent = e.data.money;
      const update_money = parseInt(argent) + item.price;
      axios
        .put(
          `${burl}/users/wallet/${item.id_owner}`,
          qs.stringify({ money: update_money }),
          {
            headers: headers,
          }
        )
        .then((res) => res)
        .catch((ee) => console.log(ee));
    })
    .catch((e) => e);

  return axios
    .put(
      `${burl}/items/buy/${item._id}`,
      qs.stringify({ sell: true, id: api.get("user") }),
      {
        headers: headers,
      }
    )
    .then((res) => res)
    .catch((e) => e);
};

/**
 * Axios's request 
 * @returns All items in this data base
 */
const getItemAll = async () => {
  return axios
    .get(`${burl}/items/all`)
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      return [];
    });
};

/**
 * Use to delete this item
 * @param {Number} id_item to delete
 * @returns Axios's response
 */
const deleteItem = async (id_item) => {
  return axios
    .delete(`${burl}/items/delete/${id_item}`)
    .then((res) => res)
    .catch((e) => e);
};

/**
 * Change this object
 * @param {String} id_item id of this item
 * @param {Object} dataItem modification value
 * @returns
 */
const changeItem = async (id_item, dataItem) => {
  dataItem.published_date = Date.now();
  return axios
    .put(`${burl}/items/update/${id_item}`, qs.stringify(dataItem), {
      headers: headers,
    })
    .then((res) => res)
    .catch((e) => []);
};

const exportedAPI = {
  url,
  login,
  signup,
  isAuth,
  logout,
  createItem,
  getUserId,
  getItemUser,
  getItemOther,
  setMoney,
  buyItem,
  deleteItem,
  changeItem,
  getItemAll,
  setSellItem,
};
export default exportedAPI;
