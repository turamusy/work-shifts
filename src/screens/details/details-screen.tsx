import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/root-stack-param';
import { useShifts } from '../../context/shifts-context';
import { styles } from './details-screen.styles';
import { TEXTS } from '../../constants/texts';
import CloseButton from '../../components/close-button/close-button';
import { WorkType } from '../../interfaces/shift';

const DetailsScreen: React.FC = () => {
  const shiftsStore = useShifts();
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const id = route.params?.id;
  const item = shiftsStore.getById(id ?? '');

  if (!item) {
    return (
      <>
        <CloseButton />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{TEXTS.EMPTY_SHIFT}</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <CloseButton />
      <ScrollView style={styles.scrollContainer}>
        {item.logo ? (
          <Image source={{ uri: item.logo }} style={styles.image} />
        ) : null}
        <View style={styles.container}>
          <Text style={styles.companyTitle}>
            {item.companyName}
          </Text>
          <Text style={styles.itemMargin}>{item.address}</Text>
          <Text style={styles.itemMargin}>
            {item.dateStartByCity} {TEXTS.DOT} {item.timeStartByCity}{TEXTS.DASH}{item.timeEndByCity}
          </Text>
          <Text style={styles.itemMargin}>
            {TEXTS.PAYMENT} {item.priceWorker ? `${item.priceWorker} ${TEXTS.RUB}` : TEXTS.DASH}
          </Text>
          <Text style={styles.itemMargin}>
            {TEXTS.REQUIRE} {item.planWorkers} {TEXTS.DOT} {TEXTS.RECRUITED} {item.currentWorkers}
          </Text>
          <Text style={styles.itemMargin}>
            {TEXTS.WORK_TYPE} {item.workTypes?.map((i: WorkType) => i.name)}
          </Text>
          <Text style={styles.itemMargin}>
            {TEXTS.RATING} {item.customerRating ?? TEXTS.DASH} (
            {item.customerFeedbacksCount ?? TEXTS.ZERO_REVIEWS})
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailsScreen;
