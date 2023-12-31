import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';

// Interfaces
interface RosterItem {
  id: string;
  name: string;
  attending: boolean;
  paid: boolean;
}

export type RootStackParamList = {
  Profile: {userId: string};
  Roster: {username: string};
};

// Mock data for testing
const rosterData: RosterItem[] = [
  {
    id: '1',
    name: 'John Doe',
    attending: true,
    paid: false,
  },
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#02131D',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#447bbe',
    paddingVertical: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },

  attendingText: {
    color: 'green',
  },

  notAttendingText: {
    color: 'red',
  },

  paidText: {
    color: 'green',
  },

  notPaidText: {
    color: 'red',
  },

  viewProfileButton: {
    backgroundColor: '#b11313',
    borderRadius: 5,
    padding: 8,
  },
  buttonText: {
    color: '#fff',
  },
});

const Roster: React.FC = () => {
  // Initialize roster state with empty array of RosterItem
  const [roster, setRoster] = useState<RosterItem[]>([]);

  // Get the navigation prop from the hook
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Get the route prop from the hook
  type RosterScreenRouteProp = RouteProp<RootStackParamList, 'Roster'>;

  // Get the username from the route params
  const route = useRoute<RosterScreenRouteProp>();
  const {username} = route.params;

  const handleViewProfile = (userId: string) => {
    // Navigate to the profile component with the user ID
    navigation.navigate('Profile', {userId});
  };

  useEffect(() => {
    // TODO: eventually set up to use real roster data from backend
    setRoster(rosterData);
  }, []);

  const renderItem = ({item}: {item: RosterItem}) => (
    <TouchableOpacity onPress={() => handleViewProfile(item.id)}>
      <View style={styles.row}>
        <Text style={styles.cell}>{username}</Text>
        {item.attending ? (
          <Text style={[styles.cell, styles.paidText]}>Attending</Text>
        ) : (
          <Text style={[styles.cell, styles.notPaidText]}>Not Attending</Text>
        )}
        {item.paid ? (
          <Text style={[styles.cell, styles.paidText]}>Paid</Text>
        ) : (
          <Text style={[styles.cell, styles.notPaidText]}>Not Paid</Text>
        )}
        <Text style={styles.cell}>MM/DD/YY</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Attending</Text>
        <Text style={styles.headerCell}>Paid</Text>
        <Text style={styles.headerCell}>Next Session</Text>
      </View>

      {/* Roster data */}
      <FlatList
        data={roster}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Roster;
