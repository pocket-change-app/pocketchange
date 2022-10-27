import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { colors } from "../constants/Colors";

export const QueryResult = (
  {
    loading,
    error,
    data,
    children,
    indicatorSize = 'large',
  }: {
    loading: boolean,
    error: any,
    data: any,
    children: any,
    indicatorSize?: number | 'small' | 'large' | undefined,
  }
) => {
  if (error) {
    return (
      <Text>
        ERROR: {error.message}
      </Text>
    )
  }
  if (loading) {
    return (
      <ActivityIndicator
        size={indicatorSize}
        color={colors.subtle}
      />
    );
  }
  if (data) {
    return children;
  } else {
    return <Text>Nothing to show...</Text>;
  }
};