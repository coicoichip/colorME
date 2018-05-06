import {NavigationActions} from 'react-navigation';
import * as types from '../constants/actionTypes';

import {Main} from '../navigation/appRouter';

const initialState = Main.router.getStateForAction(Main.router.getActionForPathAndParams('Login'));

// const initialState = Start.router.getStateForAction(NavigationActions.init());

export default function navigatorReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // case types.LOGIN:
        //     nextState = Main.router.getStateForAction(
        //         resetAction,
        //         state
        //     );
        //     break;
        case types.LOGOUT:
            nextState = Main.router.getStateForAction(
                resetLogout,
                state
            );
            break;
            console.log(nextState)
        case "Navigation/BACK":
            let stateData = {
                ...state,
                ...{currentScreen: action.routeName}
            };
            nextState = Main.router.getStateForAction(action, stateData);
            return nextState;
        case "Navigation/NAVIGATE":
            // Check can open 2 same screen
            if (action.routeName === "DrawerOpen" || action.routeName === "DrawerClose") {
                nextState = Main.router.getStateForAction(action, state);
                return nextState;
            }
            if (action.routeName !== state.currentScreen) {
                let stateData = {
                    ...state,
                    ...{currentScreen: action.routeName}
                };
                nextState = Main.router.getStateForAction(action, stateData);
                return nextState;
            }

            return nextState;
        default:
            nextState = Main.router.getStateForAction(action, state);
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

const resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
        NavigationActions.navigate({routeName: 'Drawer'})
    ]
});

const resetLogout = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
})


// class NavigationStore {
//   @observable.ref navigationState = {
//     index: 0,
//     routes: [
//       {
//         key: "Login",
//         routeName: "Login",
//         params: { title: "Login" }
//       }
//     ]
//   };

//   @action dispatch = (action, stackNavState = true) => {
//     const previousNavState = stackNavState ? this.navigationState : null;
//     const newState = (this.navigationState = RootNavigator.router.getStateForAction(
//       action,
//       previousNavState
//     ));
//     return true
//   };
// }
