import { theme } from "@/theme";
import { useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {Skeleton} from 'moti/skeleton';
import Animated, { SlideInDown, useAnimatedStyle, useSharedValue, withSequence, withTiming, runOnJS } from "react-native-reanimated";
import { router } from "expo-router";

export default function Splash(){


    //escala da img animada
    const logoScale = useSharedValue(1)
    
    //movimentação Y da logo
    const logoPositionY = useSharedValue(0)

    //Controla quando o skeleton vai ficar ativo
    const contendDisplay = useSharedValue(0)

    const contentAnimatedStyles = useAnimatedStyle(() => ({
        display: contendDisplay.value === 1 ? "flex" : "none"
    }))


    //estilo animado
    const logoAnimatedStyles = useAnimatedStyle(() => ({
        transform: [
            {scale: logoScale.value},
            {translateY: logoPositionY.value}
        ]
    }))

    const dimensions = useWindowDimensions()

    const skeletonColors = [
        theme.colors.gray[600],
        theme.colors.gray[700],
        theme.colors.gray[600],
    ]

    function logoAnimation(){
        //animação em sequencia
        logoScale.value = withSequence(
            withTiming(0.7),
            withTiming(1.4),
            // pega quando a animação acaba
            withTiming(1, undefined, (finished) => {
                if(finished){
                    logoPositionY.value = withSequence(
                        withTiming(50, undefined, (finished) => contendDisplay.value = 1),
                        withTiming(-dimensions.height + 100, {duration: 400})
                    )
                    runOnJS(onEndSplash)()
                }
            })
        )
    }
    

    function boxes(columns: "right" | "left"){
        const rest = columns === "left" ? 0 : 1

        return Array.from({length: 20})
        .filter((_,index) => index % 2 === rest)
        .map((_,index) => {
            const height = index % 2 === (columns === "left" ? 0 : 1) ? 200 : 300
            return (
                <Animated.View key={index} style={[styles.box, {height}]} >
                    <Skeleton colors={skeletonColors} width="100%" height={height}/>
                </Animated.View>
            )
        })
    }


    function onEndSplash() {
        setTimeout(() => {
            router.push("/(tabs)")
        }, 2000)
    }



    useEffect(() =>{
        logoAnimation()
    })


    return (
        <View style={styles.Container}>
            <Animated.Image
            style={[styles.Logo, logoAnimatedStyles]}
            source={require('@/assets/icone_Splash02.png')}
            />

        <Animated.View style={[styles.content, contentAnimatedStyles]} entering={SlideInDown.duration(700)}>
            <View style={styles.boxes}>
                <View style={styles.column}>{boxes("left")}</View>
                <View style={styles.column}>{boxes("right")}</View>
            </View>
        </Animated.View>

        </View>
        
    );
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: theme.colors.black,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12
    },
    Logo: {
        width: 64,
        height: 64,

    },
    boxes:{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        gap: 12
    },
    box: {
        width: '100%',
        backgroundColor: theme.colors.gray[600],
        borderRadius: 16,

    },
    column:{
        flex: 1,
        gap: 12

    },
    content: {
        flex: 1,
        width: '100%'
    }
});