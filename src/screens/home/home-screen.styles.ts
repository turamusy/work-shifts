import { StyleSheet } from 'react-native';
import { theme } from '../../styles/color-varibles';
import { convertHexToRGBA } from '../../utils/convert-hex-to-rgba';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: theme.white,
  },
  shift: {
    padding: 12,
    borderRadius: 12,
    margin: 5,
    backgroundColor: convertHexToRGBA(theme.lightGreen, 0.2),
    flexDirection: 'row',
  },
  listHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.black,
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.lightGreen,
  },
  mainInfoContainer: { flex: 1 },
  mainContainerBackground: { backgroundColor: theme.white },
  companyName: {
    fontWeight: '600',
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  errorText: {
    fontWeight: '600',
    fontSize: 26,
  },
});
