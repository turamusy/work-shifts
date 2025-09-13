import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TEXTS } from '../../constants/texts';
import { styles } from './close-button.style';

const CloseButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>{TEXTS.X}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CloseButton;
