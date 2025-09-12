import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NAVIGATION } from '../../types/navigation-routes';
import { observer } from 'mobx-react-lite';
import { requestAndGetLocation } from '../../utils/location';
import { toJS } from 'mobx';
import { useShifts } from '../../context/shifts-context';
import { ITEM_HEIGHT } from './home-screen.constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/root-stack-param';

const ShiftListScreen: React.FC = observer(() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const shiftsStore = useShifts();
  const validatedShifts = toJS(shiftsStore.shifts) ?? [];

  const handleLoadData = useCallback(async () => {
    try {
      const { lat, lon } = await requestAndGetLocation();
      await shiftsStore.loadShifts(lat, lon);
      console.log(lat, lon, 'position');
      console.log('after load shifts');
    } catch (e: any) {
      console.error('Location/load error:', e?.message ?? e);
    }
  }, [shiftsStore]);

  /*  */
  useEffect(() => {
    handleLoadData();
  }, [handleLoadData, shiftsStore]);

  if (shiftsStore.loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (shiftsStore.error) {
    return (
      <SafeAreaView style={{}}>
        <Text>{shiftsStore.error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{}}>
      <FlatList
        data={validatedShifts}
        keyExtractor={item => `${item.id} + ${item.companyName}`}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: '#eee' }} />
        )}
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: '#eee',
              flexDirection: 'row',
            }}
            onPress={() =>
              navigation.navigate(NAVIGATION.DETAILS, { id: item.id })
            }
          >
            {item.logo ? (
              <Image
                source={{ uri: item.logo }}
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 12,
                  borderRadius: 6,
                }}
              />
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{item.companyName}</Text>
              <Text>{item.address}</Text>
              <Text>
                {item.dateStartByCity} — {item.timeStartByCity}–
                {item.timeEndByCity}
              </Text>
              <Text>{item.priceWorker ? `${item.priceWorker} р` : ''}</Text>
              <Text>
                {item.currentWorkers}/{item.planWorkers} ·{' '}
                {item.customerRating ?? '-'} ⭐ (
                {item.customerFeedbacksCount ?? 0})
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
});

export default ShiftListScreen;
