import UserService from '../../services/UserService';
import { setInitializedAC } from '../actionCreators/appActionCreators';
import { setUserAC } from '../actionCreators/authActionCreators';

export const initialize = () => async (dispatch) => {
    const token = localStorage.getItem('glosAccessToken');
    
    if (token) {
        const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
        const username = tokenDecoded?.sub; // todo: uncode username from token
        const user = await UserService.getUser(username);
        // const userImage = await UserService.getUserImage(user.username); // todo: remove endpoint
        const userImage = { tempUrl: "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1" };
        if (user) {
            dispatch(setUserAC(user, userImage.tempUrl, token));
        } else {
            dispatch(setUserAC(null, null, null));
        }
    } else {
        dispatch(setUserAC(null, null, null));
    }

    dispatch(setInitializedAC(true));
}