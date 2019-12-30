import { Alert, NetInfo, AsyncStorage, Dimensions } from "react-native";

export const checkForInternet = async () => {
  try {
    NetInfo.isConnected.addEventListener("connectionChange", isConnected => {});
    const connectionInfo = await NetInfo.getConnectionInfo();
    if (connectionInfo.type === "cellular" || connectionInfo.type === "wifi") {
      // Alert.alert("There is network conection");
      console.log('There is network conection');
      return true;
    }
    // Alert.alert('No network conection');
    console.log("No network conection");
    return false;
  } catch (error) {
    Alert.alert("Something is wrong");
  }
  Alert.alert("Function didn't work");
  return false;
};

const handleServerResponse = (response) => {
  // console.log('Fetchi responsi');
  // console.log(response.status);
  if (response.status >= 400) {
    console.log('Something is wrong, the response is: ' + response.status.toString());
    // console.log(response);
    return false;
  }
  return true;
};

export const fetchData = async (url) => {
  if (await checkForInternet()) {
    // console.log('Begining to fetch from ' + url);
    try {
      const response = await fetch(url, {
        method: "get"
      });
      // console.log("Fetchi responsi");
      // console.log(await response);
      if (handleServerResponse(await response)) {
        console.log('Data fetched');
        return response.json();
      }
    } catch (error) {
      console.log(error);
      console.log("Can't fetch from server");
      return false;
    }
  }
  return false;
};
