import LoginContainer from "../modules/login/LoginContainer";
import RegisterContainer from "../modules/register/RegisterContainer";
import DrawerContainer from "../modules/drawer/DrawerContainer";
import {StackNavigator} from "react-navigation"
export const Main = StackNavigator(
    {
        Login: { screen: LoginContainer },
        Register: { screen: RegisterContainer },
        Drawer: { screen: DrawerContainer },
    }
)