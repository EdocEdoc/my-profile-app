import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateProfile from "../screens/CreateProfile";
import Profile from "../screens/Profile";
import CreatePost from "../screens/CreatePost";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ title: "Create Post" }}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfile}
          options={{ title: "Create Profile" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
