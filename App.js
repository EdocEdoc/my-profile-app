import "react-native-gesture-handler";
import Providers from "./src/navigation";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Warning: Encountered two children with the same key",
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function App() {
  return <Providers />;
}
