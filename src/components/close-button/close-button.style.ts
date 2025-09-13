import { StyleSheet } from 'react-native';
import { theme } from '../../styles/color-varibles';

export const styles = StyleSheet.create({
  closeButton: {
    padding: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: theme.black,
  },
  header: {
    backgroundColor: theme.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
