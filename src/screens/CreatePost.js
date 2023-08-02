import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  Avatar,
  Caption,
  Divider,
  Paragraph,
  Subheading,
  Surface,
  TextInput,
  Title,
  Checkbox,
  TouchableRipple,
  HelperText,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { SET_PROFILE } from "../redux/actions/profileActions";

const CreatePost = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profileState.profile);
  const profilesState = useSelector((state) => state.profileState.profiles);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [isHuman, setIsHuman] = useState(false);
  const [requiredErrors, setRequiredErrors] = useState({
    title: false,
    body: false,
    username: false,
    human: false,
  });

  const createPost = async () => {
    setIsLoading(true);

    setRequiredErrors({
      title: false,
      body: false,
      username: false,
      human: false,
    });

    if (!title || !body || !isHuman || !value) {
      const errors = {
        title: !title,
        body: !body,
        human: !isHuman,
        username: !value,
      };
      setRequiredErrors(errors);
    } else {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            body: body,
            userId: value?.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        console.log(
          "🚀 ~ file: CreatePost.js:42 ~ createPost ~ res:",
          res.status
        );
        const result = await res.json();
        console.log(
          "🚀 ~ file: CreatePost.js:44 ~ createPost ~ result:",
          result
        );
        if (res.status < 300) {
          navigation.navigate("Profile");
        }
      } catch (error) {
        console.log("🚀 ~ file: CreatePost.js:31 ~ createPost ~ error:", error);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (value) {
      dispatch(SET_PROFILE(value));
    }
  }, [value]);

  useEffect(() => {
    if (profilesState.length > 0) {
      let partialArrayItems = profilesState.map((item) => {
        return { label: item.username, id: item.id, value: item };
      });

      setItems(partialArrayItems);
    }
  }, [profilesState]);

  useEffect(() => {
    if (profileState) {
      setValue(profileState);
    }
  }, [profileState]);

  const hasErrors = () => {
    return title ? !title.includes("@") : true;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {value && (
          <TouchableRipple onPress={() => navigation.navigate("Profile")}>
            <Surface
              style={{
                borderRadius: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Avatar.Text
                size={50}
                label={`${value.name.split(" ")[0][0]}${
                  value.name.split(" ")[1][0]
                }`}
              />
              <Divider />
              <Title>{value.name}</Title>
              <Subheading>{value.username}</Subheading>
              <Caption>
                {value.phone} | {value.email}
              </Caption>
            </Surface>
          </TouchableRipple>
        )}

        <Divider style={{ marginVertical: 10 }} />
        <Surface
          style={{
            borderRadius: 10,
            width: "100%",
            padding: 10,
          }}
        >
          <Title>POST</Title>
          <Divider style={{ marginBottom: 10 }} />
          <TextInput
            mode="outlined"
            label="Title"
            style={{ marginBottom: 10 }}
            onChangeText={(text) => setTitle(text)}
            error={requiredErrors.title}
          />
          {requiredErrors.title && (
            <HelperText
              style={{ marginTop: -10 }}
              type="error"
              visible={requiredErrors.title}
            >
              Title is required!
            </HelperText>
          )}

          <TextInput
            mode="outlined"
            style={{ marginBottom: 10 }}
            numberOfLines={5}
            multiline={true}
            label="Body"
            onChangeText={(text) => setBody(text)}
            error={requiredErrors.body}
          />
          {requiredErrors.body && (
            <HelperText
              style={{ marginTop: -10 }}
              type="error"
              visible={requiredErrors.body}
            >
              Body is required!
            </HelperText>
          )}
          <Paragraph>Profile</Paragraph>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select an username"
            dropDownDirection="TOP"
          />
          {requiredErrors.username && (
            <HelperText
              style={{ marginTop: -10 }}
              type="error"
              visible={requiredErrors.username}
            >
              Username is required!
            </HelperText>
          )}
          <TouchableRipple
            onPress={() => {
              setIsHuman(!isHuman);
            }}
            style={{ marginTop: 10 }}
          >
            <View
              style={{
                width: "100%",
                borderRadius: 10,
                backgroundColor: "white",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Checkbox
                status={isHuman ? "checked" : "unchecked"}
                onPress={() => {
                  setIsHuman(!isHuman);
                }}
              />
              <Paragraph>I am a Human</Paragraph>
            </View>
          </TouchableRipple>
          {requiredErrors.human && (
            <HelperText type="error" visible={requiredErrors.human}>
              Required!
            </HelperText>
          )}
        </Surface>
        <Divider style={{ marginVertical: 10 }} />
        <Button
          icon="post"
          mode="contained"
          onPress={createPost}
          disabled={isLoading}
          loading={isLoading}
        >
          SUBMIT
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
