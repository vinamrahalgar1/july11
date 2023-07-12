import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Modal, Pressable, FlatList } from 'react-native';
import { Provider, Appbar, TextInput } from 'react-native-paper';

const MYComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [dataList, setDataList] = useState([]);

  const apiEndpoint = 'https://api.mywebtuts.com/api/users';

  const handleClick = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, email: email })
    };

    fetch(apiEndpoint, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setModalVisible(true); 
        setDataList([...dataList, { firstName: firstName, email: email }]); 
        setFirstName(''); 
        setEmail('');
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Provider>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Welcome" />
      </Appbar.Header>
      <View style={styles.mainbox}>
        <Text style={styles.labelText}>First Name:</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Enter First Name"
          onChangeText={firstName => setFirstName(firstName)}
          value={firstName}
        />
        <Text style={styles.labelText}>Email:</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Email"
          onChangeText={email => setEmail(email)}
          value={email}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>User Created Successfully:</Text>
              <Text style={styles.modalText}>Name: {firstName}</Text>
              <Text style={styles.modalText}>Email: {email}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Button
          title="Submit"
          onPress={handleClick}
          color="#6200EE"
        />
        <View style={styles.dataListContainer}>
          <Text style={styles.dataListTitle}>All Inputs:</Text>
          {dataList.length > 0 ? (
            <FlatList
              data={dataList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.dataListItem}>
                  <Text>{`Name: ${item.firstName}`}</Text>
                  <Text>{`Email: ${item.email}`}</Text>
                </View>
              )}
            />
          ) : (
            <Text>No inputs yet</Text>
          )}
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200EE',
  },
  mainbox: {
    textAlign: 'center',
    margin: 15,
  },
  labelText: {
    marginTop: 10,
    marginBottom: 5,
  },
  inputText: {
    height: 45,
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6
  },
  button: {
    borderRadius: 4,
    padding: 8,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#C82333",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dataListContainer: {
    marginTop: 20,
  },
  dataListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataListItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default MYComponent;
