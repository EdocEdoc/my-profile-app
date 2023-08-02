import { Provider } from "react-redux";
import store from "../redux/store";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./route";

const Providers = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </Provider>
  );
};

export default Providers;
