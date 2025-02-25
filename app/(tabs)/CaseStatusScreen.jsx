import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CaseStatusScreen = () => {
  const navigation = useNavigation();

  const [cases, setCases] = useState([]); // To store the list of cases
  const [loading, setLoading] = useState(true);
  const [latestCase, setLatestCase] = useState(null); // To store the latest case

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://172.20.10.3:3000/api/reports');
        setCases(response.data);

        if (response.data.length > 0) {
          const lastCase = response.data[response.data.length - 1]; // Get the last case
          setLatestCase(lastCase);
        }
      } catch (error) {
        console.error('Error fetching case details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading case details...</Text>
      </View>
    );
  }

  if (!latestCase) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No cases found.</Text>
      </View>
    );
  }

  // Define the steps
  const steps = [
    { title: 'Dispatch Team', status: ['Dispatch Team (Pet Animal)', 'Dispatch Team (Wild Animal)'] },
    { title: 'Team Arrived', status: ['Team Arrived'] },
    { title: 'Rescue Ongoing', status: ['Rescue Ongoing'] },
    { title: 'Animal Rescued', status: ['Problem Resolved'] },
  ];

  // Function to get step color
  const getStepColor = (stepStatuses) => {
    if (stepStatuses.includes(latestCase.status)) {
      return '#FFB300'; // Active color for the current step
    }
    return '#6c757d'; // Gray for inactive steps
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.caseCard}>
        <Text style={styles.caseDetail}>Species Name: {latestCase.animalSpecies}</Text>
        <Text style={styles.caseDetail}>Animal Type: {latestCase.animalType}</Text>

        {/* Progress Tracker */}
        <View style={styles.progressContainer}>
          {steps.map((step, index) => {
            const isStepActive = step.status.includes(latestCase.status);
            return (
              <View key={index} style={styles.stepRow}>
                <View
                  style={[
                    styles.circle,
                    { backgroundColor: getStepColor(step.status) },
                  ]}
                >
                  <Text style={styles.stepText}>{index + 1}</Text>
                </View>
                <Text
                  style={[
                    styles.stepTitle,
                    isStepActive && { color: '#FFB300' },
                  ]}
                >
                  {step.title}
                </Text>
              </View>
            );
          })}
        </View>

        <Button
          title="Go Back"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caseCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  caseDetail: {
    fontSize: 18,
    marginBottom: 5,
  },
  progressContainer: {
    marginTop: 20,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CaseStatusScreen;
