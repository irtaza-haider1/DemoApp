import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleInterest } from '../store/onboardingSlice';
import { RootState } from '../store/store';


interface InterestCheckboxProps {
  label: string;
}

const InterestCheckbox: React.FC<InterestCheckboxProps> = ({ label }) => {
  const dispatch = useDispatch();
  const selectedInterests = useSelector((state: RootState) => state.onboarding.interests);

  const isSelected = selectedInterests.includes(label);

  const handleToggle = () => {
    dispatch(toggleInterest(label));
  };

  return (
    <TouchableOpacity style={[styles.checkbox, isSelected && styles.selected]} onPress={handleToggle}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 2.5,
    borderColor: '#C5C6CC',
    borderWidth: 0.5,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  selected: {
    backgroundColor: '#EAF2FF',
  },
  label: {
    fontSize: 14,
  },
});

export default InterestCheckbox;
