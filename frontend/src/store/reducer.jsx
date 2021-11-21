import * as actionTypes from "./actions";

const initialState = {
  user: null,
  token: null,
  phoneNumberVerified: null,
  phoneNumber: null,
  role:null,
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
    default:
      return state;
  }
};

export default reducer;
