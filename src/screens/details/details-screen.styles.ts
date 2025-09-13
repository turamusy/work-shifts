import { StyleSheet } from 'react-native';
import { theme } from '../../styles/color-varibles';
import { convertHexToRGBA } from '../../utils/convert-hex-to-rgba';

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.white,
    padding: 16,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    borderRadius: 12,
    marginHorizontal: 5,
    marginTop: 10,
    padding: 10,
    backgroundColor: convertHexToRGBA(theme.lightGreen, 0.2),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.black,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    alignSelf: 'center',
  },
  companyTitle: { fontSize: 20, fontWeight: '700', marginTop: 12 },
  itemMargin: { marginTop: 8 },
});
