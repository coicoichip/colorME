import { StackNavigator } from 'react-navigation';
import RegisterContainer from '../modules/register/RegisterContainer';
import Hometest from '../modules/register/Hometest';

export const Main = StackNavigator({
    Register: { screen: RegisterContainer },
    Home: { screen: Hometest }

}, { headerMode: 'none' })
