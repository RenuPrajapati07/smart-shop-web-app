import { useSelector } from 'react-redux'
import { selectEmail,  selectIsLoggedIn } from '../../redux/slice/authSlice'

const ShowOnLogin = ({children}) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn) {
        return children;
    }
    return null;
};

export const ShowOnLogout = ({children}) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(!isLoggedIn) {
        return children;
    }
    return null;
};

 export const ShowOnAdminLogin = ({children}) => {

    const Email = useSelector(selectEmail);

    if(Email === "prajapatirenu790@gmail.com") {
        console.log(Email)
        return children;
    }
    return null;
};
export default ShowOnLogin;