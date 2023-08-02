import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Avatar,
  Caption,
  Divider,
  Paragraph,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
import { useSelector } from "react-redux";
import ProfileDetail from "../components/ProfileDetail";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Profile = () => {
  const profileState = useSelector((state) => state.profileState.profile);
  return (
    <SafeAreaView>
      {profileState && (
        <ScrollView contentContainerStyle={{ padding: 10 }}>
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
              label={`${profileState.name.split(" ")[0][0]}${
                profileState.name.split(" ")[1][0]
              }`}
            />
            <Divider />
            <Title>{profileState.name}</Title>
            <Subheading>{profileState.username}</Subheading>

            <ProfileDetail icon="web" desc={profileState.website} />
            <ProfileDetail icon="phone-outline" desc={profileState.phone} />
            <ProfileDetail icon="email-outline" desc={profileState.email} />
            <ProfileDetail icon="map-outline" desc={profileState.address} />
            <ProfileDetail icon="store-outline" desc={profileState.company} />
          </Surface>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
