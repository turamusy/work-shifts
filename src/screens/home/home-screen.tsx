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
import ItemSeparator from '../../components/list-separator/list-separator';
import { styles } from './home-screen.styles';
import { TEXTS } from '../../constants/texts';

const ShiftListScreen: React.FC = observer(() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const shiftsStore = useShifts();
  const validatedShifts = toJS(shiftsStore.shifts) ?? [];

  const handleLoadData = useCallback(async () => {
    try {
      const { lat, lon } = await requestAndGetLocation();
      await shiftsStore.loadShifts(lat, lon);
    } catch (e: any) {
      console.error('Location/load error:', e?.message ?? e);
    }
  }, [shiftsStore]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData, shiftsStore]);

  const renderListHeader = () => <View style={styles.listHeader}><Text style={styles.listHeaderText}>{TEXTS.LIST_TITLE}</Text></View>;

  if (shiftsStore.loading) {
    return <ActivityIndicator size={'large'} style={[styles.mainInfoContainer, styles.mainContainerBackground]} />;
  }

  if (shiftsStore.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{shiftsStore.error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={validatedShifts}
        keyExtractor={item => `${item.id} + ${item.companyName}`}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={ItemSeparator}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={21}
        getItemLayout={(_data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.shift}
            onPress={() =>
              navigation.navigate(NAVIGATION.DETAILS, { id: item.id })
            }
          >
            {item.logo ? (
              <Image
                source={{ uri: item.logo }}
                style={styles.image}
              />
            ) : null}
            <View style={styles.mainInfoContainer}>
              <Text style={styles.companyName}>{item.companyName}</Text>
              <Text>{item.address}</Text>
              <Text>
                {item.dateStartByCity} {TEXTS.DASH} {item.timeStartByCity}{TEXTS.DASH}
                {item.timeEndByCity}
              </Text>
              <Text>{item.priceWorker ? `${item.priceWorker} ${TEXTS.RUB}` : ''}</Text>
              <Text>
                {item.currentWorkers}/{item.planWorkers} ·
                {item.customerRating ?? TEXTS.DASH} ⭐ (
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
