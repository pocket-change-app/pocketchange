import { StyleSheet } from 'react-native';
import { colors } from './constants/Colors';

export const styles = StyleSheet.create({
    scrollView: {
        padding: 15,
    },

    card: {
        //flex: 1,
        marginBottom: 15,
        backgroundColor: colors.card,
        borderColor: colors.light,
        borderWidth: 2,
        borderRadius: 10,
        //padding: 15,
    },
    
    name: {
        fontSize: 24,
        lineHeight: 26,
        fontFamily: 'metropolis black',
        color: colors.dark,
    },
    
    address: {
        textTransform: 'uppercase',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'metropolis medium',
        color: colors.medium,
    },
    
    pocket: {
        textTransform: 'uppercase',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'metropolis bold italic',
        color: colors.subtle,
    },

    container: {
        padding: 15,
    },

    imageContainer: {
        width: '100%',
        height: 200,
        
    },

    businessHeaderImage: {
        flex:1 , 
        width: undefined, 
        height: undefined,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },

    businessInfo: {
        margin: 15,
    }
})