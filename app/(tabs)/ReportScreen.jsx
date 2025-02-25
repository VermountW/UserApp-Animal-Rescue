import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

function ReportScreen() {
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalType, setAnimalType] = useState('pet');
  const [location, setLocation] = useState('');
  const [animalCondition, setAnimalCondition] = useState('');

  const handleSubmit = async () => {
    if (!animalSpecies || !location || !animalCondition) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://Your IP address :3000/api/reports', { //  change with your IP address
        animalSpecies,
        animalType,
        location,
        animalCondition,
        timestamp: new Date(),
      });

      Alert.alert('Success', 'Anomaly reported successfully!');
      setAnimalSpecies('');
      setAnimalType('pet');
      setLocation('');
      setAnimalCondition('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to report anomaly.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report an Animal Anomaly</Text>

      <Text style={styles.label}>Animal Species:</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., Dog, Elephant"
        value={animalSpecies}
        onChangeText={setAnimalSpecies}
      />

      <Text style={styles.label}>Animal Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={animalType}
          onValueChange={(itemValue) => setAnimalType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pet" value="pet" />
          <Picker.Item label="Wild Animal" value="wild" />
        </Picker>
      </View>

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., Park, Forest"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Animal Condition:</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., Injured, Hungry"
        value={animalCondition}
        onChangeText={setAnimalCondition}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderRadius: 8, // Rounded corners for the container
    marginVertical: 12, // Adjust margin for the Picker container
    backgroundColor: '#ADD8E6', // Background color for the Picker
    overflow: 'hidden', // Ensures the Picker stays inside the rounded container
  },
  picker: {
    height: 50, // Set the height of the Picker
    width: '100%', // Ensure it takes full width
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'transparent', // Fixing the typo
  },
  button: {
    backgroundColor: '#FFB300',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#333', // Ensure text color is correct
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportScreen;
