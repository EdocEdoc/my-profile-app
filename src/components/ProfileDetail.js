import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Paragraph } from "react-native-paper";
import { useState, useEffect } from "react";

const ProfileDetail = ({ icon, desc }) => {
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (!description) {
      const str = JSON.stringify(desc);
      const str2 = str.replace(/[{}]/g, "");
      const str3 = str2.replace(/[,]/g, `,\n`);
      const str4 = str3.replace(/["]/g, "");
      setDescription(str4);
    }
  }, [description]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        width: "100%",
        marginLeft: -30,
      }}
    >
      <Icon name={`${icon}`} size={25} style={{ margin: 5 }} />
      <Paragraph style={{ marginTop: 5 }}>{description}</Paragraph>
    </View>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({});
