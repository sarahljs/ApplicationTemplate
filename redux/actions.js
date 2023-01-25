import {
  SET_LOADING_SCREEN,
  SET_DYNAMIC_DATA,
} from './actionTypes';

import firestore from '@react-native-firebase/firestore';

export function setLoading(loading) {
  return function (dispatch) {
    dispatch({
      type: SET_LOADING_SCREEN,
      payload: loading,
    });
  };
}

function onError(error) {
  console.error(error);
}

export function fetchDynamicData() {
  return async function (dispatch) {
    let dynamicData = [];

    console.log('Fetching Dynamic Data');

    dbRefDynamicDetails = await firestore().collection('DynamicData');

    dbRefDynamicDetails
      .onSnapshot(DynamicSnapshot => {
        if (DynamicSnapshot != null) {
          DynamicSnapshot.docChanges().forEach(DynamicChange => {
            DynamicResponse = {
              ...DynamicChange.doc.data(),
              Title: DynamicChange.doc.data().Title,
              Description: DynamicChange.doc.data().Description,
            };

            if (DynamicResponse != null) {
              dynamicData.push({
                id: DynamicChange.doc.id,
                data: DynamicResponse,
                eventTime: DynamicChange.doc.data().CreatedAt,
                eventResponse: DynamicResponse,
              });
            }
          });
        }
      }, onError);

    //Sort with activityTime
    dynamicData.sort((val1, val2) => {
      return new Date(val1.activityTime) - new Date(val2.activityTime);
    });

    dispatch({
      type: SET_DYNAMIC_DATA,
      payload: dynamicData,
    });
  }

}