import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import InterestCheckbox from "./InterestCheckbox";
import OnboardingStep from "./OnboardingStep";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const selectedInterests = useSelector(
    (state: RootState) => state.onboarding.interests
  );
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const steps = [
    {
      title: "Create a prototype in just a few minutes",
      content: (
        <Text style={styles.description}>
          Enjoy these pre-made components and worry only about creating the best
          product ever.
        </Text>
      ),
    },
    {
      title: "Personalize your experience",
      content: (
        <>
          <InterestCheckbox label="User Interface" />
          <InterestCheckbox label="User Experience" />
          <InterestCheckbox label="User Research" />
          <InterestCheckbox label="UX Writing" />
          <InterestCheckbox label="User Testing" />
          <InterestCheckbox label="Service Design" />
          <InterestCheckbox label="Strategy" />
          <InterestCheckbox label="Design Systems" />
        </>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (selectedInterests.length > 0) {
      navigation.navigate("Login");
    } else {
      alert("Please select at least one interest.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Wrap the entire content in ScrollView to enable scrolling */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {currentStep === 0 && (
          <View style={styles.pageOneContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: "https://www.colorhexa.com/eaf2ff.png" }}
                style={styles.image}
              />
            </View>

            <View style={styles.secondaryContainer}>
              <OnboardingStep
                title={steps[currentStep].title}
                titleStyle={styles.title}
              >
                {steps[currentStep].content}
              </OnboardingStep>

              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {currentStep === 1 && (
          <View style={styles.pageTwoContainer}>
            <ProgressBar
              progress={1}
              color="#007AFF"
              style={styles.progressBar}
            />

            <View style={styles.textContainer}>
              <Text style={styles.heading}>Personalize Your Experience</Text>
              <Text style={styles.subheading}>Choose your interests</Text>
            </View>
            <View style={styles.interestsContainer}>
              {steps[currentStep].content}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  pageOneContainer: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 500,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EAF2FF",
  },
  secondaryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "left",
    color: "#000",
    fontFamily: "Inter-Bold",
  },
  description: {
    fontSize: 12,
    textAlign: "left",
    fontWeight: "400",
    color: "#71727A",
    fontFamily: "Inter-Regular",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  pageTwoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  progressBar: {
    marginTop: 30,
    height: 10,
  },
  textContainer: {
    marginTop: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "left",
    fontFamily: "Inter-Bold",
  },
  subheading: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    color: "#71727A",
    fontFamily: "Inter-Regular",
  },
  interestsContainer: {
    marginTop: 20,
  },
});

export default OnboardingScreen;
