import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Card} from '@rneui/themed';
import {theme} from '../themes';
import { t } from '../localization';
import HumanResources from '../assets/icons/human-resource.svg';
import Websites from '../assets/icons/website.svg';
import Ecommerce from '../assets/icons/e-commerce.svg';
import Assistant from '../assets/icons/assistant.svg';
import Knowledge  from '../assets/icons/knowledge.svg';

const numColumns = 2;
const itemWidth = 0.8 * (Dimensions.get('window').width / numColumns) - 20;
const services = [
  {
    name: t('Human_resources'),
    screen: "HumanResources",
    icon: HumanResources
  },
  {
    name: t('E_commerce'),
    screen: "Ecommerce",
    icon: Ecommerce
  },
  {
    name: t('Virtual_assistants'),
    screen: "VirtualAssistants",
    icon: Assistant
  },
  {
    name: t('Websites'),
    screen: "Websites",
    icon: Websites
  },
  {
    name: t('Knowledge'),
    screen: "Knowledge",
    icon: Knowledge
  }
]

export default function ShortCuts(): React.JSX.Element {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <Card>
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}  style={styles.item}>
          <Icon width={50} height={50} color={theme.lightColors?.primary}/>
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      </Card>
    );
  };
  return (
    <View style={styles.contentContainer}>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.screen}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: theme.lightColors?.primary,
    textDecorationColor: theme.lightColors?.primary,
    borderColor: theme.lightColors?.primary
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  item: {
    width: itemWidth,
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderColor: theme.lightColors?.primary,
  },
  itemText: {
    color: theme.lightColors?.primary,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
