import React from "react";
import CheckBox from "expo-checkbox";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootStackParamList } from "../../types/navigation";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Required"),
    termsAccepted: Yup.boolean().oneOf([true], "Terms must be accepted"),
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>Create an account to get started</Text>
        </View>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsAccepted: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form values: ", values);
            navigation.navigate("Confirmation"); // Navigate to Confirmation screen
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {errors.name && touched.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="name@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={values.termsAccepted}
                  onValueChange={(value) =>
                    setFieldValue("termsAccepted", value)
                  }
                />
                <Text style={styles.checkboxText}>
                  I've read and agree with the{" "}
                  <Text style={styles.link}>Terms and Conditions</Text> and{" "}
                  <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
              </View>
              {errors.termsAccepted && (
                <Text style={styles.errorText}>{errors.termsAccepted}</Text>
              )}

              <TouchableOpacity
                style={[
                  styles.signUpButton,
                  !values.termsAccepted && styles.disabledButton,
                ]}
                disabled={!values.termsAccepted}
                onPress={handleSubmit as any}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "flex-start",
  },
  titleContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6c757d",
    marginTop: 5,
    fontFamily: "Inter-Regular",
  },
  formContainer: {
    marginTop: 20,
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#6c757d",
  },
  link: {
    color: "#007BFF",
  },
  signUpButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignUpScreen;
