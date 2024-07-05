import {View, Text, StyleSheet, Image, Animated} from "react-native";
import {useLocale} from "@/providers/LocaleProvider/LocaleProvider";
import {ButtonVariants, ThemedButton} from "@/components/ThemedButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useRouter} from "expo-router";
import {RepeatType} from "@/app/game/repeatWords";
import {useRef, useState} from "react";

export default function IndexScreen() {
  const { i18n } = useLocale();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [animatedDegree, setAnimatedDegree] = useState(new Animated.Value(0));

  const goToAddWord = (): void => {
   animateLogo(() => router.push('/game/addWord'));
  }

  const goToRepeatWords = (): void => {
    animateLogo(() => router.push({ pathname: '/game/selectDictionaries', params: { type: RepeatType.TYPE_WORDS } }));
  }

  const goToDictionaries = (): void => {
    animateLogo(() => router.push({ pathname: '/game/dictionaries' }));
  }

  const goToRepeatTranslations = (): void => {
    animateLogo(() => router.push({ pathname: '/game/selectDictionaries', params: { type: RepeatType.TYPE_TRANSLATIONS } }));
  }

  const animateLogo = (callback: () => void) => {
    Animated.timing(animatedDegree, {
      toValue: 360,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setAnimatedDegree(new Animated.Value(0));
      callback();
    });
  }

  const styles = StyleSheet.create({
    appName: {
      fontSize: 36,
      fontWeight: 'bold',
      marginHorizontal: 'auto',
      color: Colors[colorScheme ?? 'light'].text,
    },
    yellow: {
      color: Colors.yellow,
    },
    logo: {
      width: 150,
      height: 150,
      marginHorizontal: 'auto',
      marginTop: 50,
      borderRadius: 12,
    },
    buttonsContainer: {
      gap: 20,
      marginTop: 100,
      alignItems: 'center'
    }
  })
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 100, padding: 25, backgroundColor: Colors[colorScheme ?? 'light'].background, }}>
      <Text style={styles.appName}>
        {i18n.t('remember')}
        <Text style={styles.yellow}>&nbsp;{i18n.t('me')}</Text>
      </Text>
      <Animated.Image style={[styles.logo, { transform: [{
        rotateZ: animatedDegree.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
          })
      }] }]} source={require('../assets/images/icon.png')} />

      <View style={styles.buttonsContainer}>
        <View style={{ alignItems: 'flex-start', gap: 10, width: '100%', borderLeftWidth: 4, borderColor: Colors.yellow }}>
          <ThemedButton variant={ButtonVariants.Yellow} text={i18n.t('buttons.addWord')} onPress={goToAddWord}></ThemedButton>
          <ThemedButton variant={ButtonVariants.Yellow} text={i18n.t('dictionaries')} onPress={goToDictionaries}></ThemedButton>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 10, width: '100%', borderRightColor: Colors.primary, borderRightWidth: 4 }}>
          <ThemedButton text={i18n.t('buttons.repeatWords')} onPress={goToRepeatWords}></ThemedButton>
          <ThemedButton text={i18n.t('buttons.repeatTranslations')} onPress={goToRepeatTranslations}></ThemedButton>
        </View>
      </View>
    </SafeAreaView>
  );
}