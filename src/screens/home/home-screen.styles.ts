import { StyleSheet } from "react-native";
import { theme } from "../../styles/color-varibles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingVertical: 12,
        backgroundColor: theme.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});