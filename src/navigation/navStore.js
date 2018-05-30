import { observable, action } from "mobx";
import { RootStack } from "./Router"
export default navStore = new class NavStore {
  @observable.ref navigationState = {
    index: 0,
    routes: [
      {
        key: null,
        routeName: "Splash",

      }
    ]
  };
  @action dispatch = (action, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null;
    return this.navigationState = RootStack
      .router
      .getStateForAction(action, previousNavState);
  }

}

