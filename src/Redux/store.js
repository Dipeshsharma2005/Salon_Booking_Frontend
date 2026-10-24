import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import salonReducer from "./Salon/reducer";
import bookingReducer from "./Booking/reducer";
import authReducer from "./Auth/reducer";
import reviewReducer from "./Review/reducer";
import categoryReducer from "./Category/reducer";
import notificationReducer from "./Notifications/reducer";
import proceedPaymentReducer from "./Payment/reducer";
import serviceOfferingReducer from "./Salon Services/reducer";
import { chartReducer } from "./Chart/reducer";

const rootReducer = combineReducers({

    salon:salonReducer,
    booking:bookingReducer,
    auth: authReducer,
    review:reviewReducer,
    category:categoryReducer,
    notification:notificationReducer,
    payment:proceedPaymentReducer,
    salonService:serviceOfferingReducer,
    chart:chartReducer

});

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));