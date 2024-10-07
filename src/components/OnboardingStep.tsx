import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface OnboardingStepProps {
  children: React.ReactNode;
  title: string;
  titleStyle?: object;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
  children,
  title,
  titleStyle,
}) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "800",
    textAlign: "left",
  },
});

export default OnboardingStep;
