import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { colors } from "../constants/Colors";

export const QueryResult = ({loading, error, data, children}: any) => {
    if (error) {
      return <Text>ERROR: {error.message}</Text>;
    }
    if (loading) {
      return (
        <ActivityIndicator size="large" color={colors.subtle} style={{ margin: 10 }} />
      );
    }
    if (!data) {
      return <Text>Nothing to show...</Text>;
    }
    if (data) {
      return children;
    }
  };