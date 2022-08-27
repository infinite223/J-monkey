import { StyleSheet } from "react-native"; 

export const style = StyleSheet.create({
    imageBackground: {
        backgroundColor: '#ccc',
        resizeMode: 'stretch', 
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    scoreInGameText: {  
        position:'absolute',
        top:15,
        left:15,
        zIndex:2,
        backgroundColor:'rgba(8, 8, 8, .5)', 
        paddingHorizontal:15,
        borderRadius:10,
        paddingVertical:5,
        textAlign:'center',
        color:"white", 
        fontSize:25
    },
    mainContainer: {
        flex:1,
        justifyContent:"center",
        flexDirection:'row', 
        alignItems:"center", 
        backgroundColor:"rgba(18, 18, 18,.6)", 
        borderRadius:0
    },
    startGameText: {
        color:"white", 
        fontSize:40, 
        letterSpacing:5,
        fontWeight:'bold', 
        fontFamily: 'sans-serif-condensed'
    },
    levelText: {
        fontWeight:'bold', 
        fontSize:22, 
        textAlign:'center', 
        letterSpacing:3, 
        fontFamily: 'sans-serif-condensed'    
    },
    scoreText: {
        fontSize:25, 
        fontWeight:'bold', 
        marginLeft:10
    }
})