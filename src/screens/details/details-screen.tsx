import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/root-stack-param';
import { useShifts } from '../../context/shifts-context';

type Route = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC = () => {
  const shiftsStore = useShifts();
  
  const route = useRoute<Route>();
  const id = route.params?.id ;
  const item = shiftsStore.getById(id ?? '');

  if (!item) {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>Данные для этой смены недоступны</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {item.logo ? <Image source={{uri: item.logo}} style={{width:120, height:120, borderRadius:8, alignSelf:'center'}} /> : null}
      <Text style={{fontSize:20, fontWeight:'700', marginTop:12}}>{item.companyName}</Text>
      <Text style={{marginTop:8}}>{item.address}</Text>
      <Text style={{marginTop:8}}>{item.dateStartByCity} · {item.timeStartByCity}—{item.timeEndByCity}</Text>
      <Text style={{marginTop:8}}>Выплата: {item.priceWorker ? `${item.priceWorker} ₽` : '—'}</Text>
      <Text style={{marginTop:8}}>Требуется: {item.planWorkers} · Набрано: {item.currentWorkers}</Text>
      <Text style={{marginTop:8}}>Типы работ: {item.workTypes?.map((i: any) => i.name)}</Text>
      <Text style={{marginTop:8}}>Рейтинг: {item.customerRating ?? '-'} ({item.customerFeedbacksCount ?? 0} отзывов)</Text>
    </ScrollView>
  );
}

export default DetailsScreen;
