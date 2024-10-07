import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ConfirmationPage = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [isFocused, setIsFocused] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={Platform.OS === "ios" ? 20 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Enter confirmation code</Text>
            <Text style={styles.subtitle}>
              A 4-digit code was sent to{" "}
              <Text style={styles.email}>IrtazaHaider@email.com</Text>
            </Text>
            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.codeInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChangeText={(value) => handleCodeChange(index, value)}
                />
              ))}
            </View>
          </View>

          <View
            style={[
              styles.buttonContainer,
              { marginTop: isFocused ? 30 : 380 },
            ]}
          >
            {/* Resend Code Button is always shown */}
            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendText}>Resend code</Text>
            </TouchableOpacity>

            {/* Continue Button is shown only when isFocused is true */}
            {isFocused && (
              <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  textContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Inter-Regular",
  },
  email: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 30,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  codeInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#006FFD",
    textAlign: "center",
    fontSize: 20,
  },
  buttonContainer: {
    paddingTop: 60,
    alignItems: "center",
  },
  resendButton: {
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: "#006FFD",
    fontFamily: "Inter-Regular",
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#006FFD",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
});

export default ConfirmationPage;
