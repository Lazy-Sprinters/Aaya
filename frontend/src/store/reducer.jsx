import * as actionTypes from "./actions";

const initialState = {
  user: null,
  token: null,
  phoneNumberVerified: null,
  phoneNumber: null,
  role:null,
  admin_data:null,
  client_data:null,
  client_service_data:null,
  service_data:null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_USER: {
      // {console.log("user edited")}
      return {
        ...state,
        user: action.user,
      };
    }
    case actionTypes.CHANGE_TOKEN: {
      // console.log("token edited")
      return {
        ...state,
        token: action.token,
      };
    }
    case actionTypes.VERIFY_PHONE: {
        // console.log("token edited")
        return {
          ...state,
          phoneNumberVerified: action.phoneNumberVerified,
          phoneNumber: action.phoneNumber,
        };
      }
      case actionTypes.CHANGE_ROLE: {
        // console.log("token edited")
        return {
          ...state,
          role: action.role,
        };
      }
      case actionTypes.CHANGE_ADMIN_DATA: {
        // console.log("token edited")
        return {
          ...state,
          admin_data: action.admin_data,
        };
      }
      case actionTypes.CHANGE_CLIENT_DATA: {
        // console.log("token edited")
        return {
          ...state,
          client_data: action.client_data,
        };
      }
      case actionTypes.CHANGE_CLIENT_SERVICE_DATA: {
        // console.log("token edited")
        return {
          ...state,
          client_service_data: action.client_service_data,
        };
      }
      case actionTypes.CHANGE_SERVICE_DATA: {
        // console.log("token edited")
        return {
          ...state,
          service_data: action.service_data,
        };
      }
    default:
      return state;
  }
};

export default reducer;
