import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, Button, Text, FlatList, Pressable, Dimensions} from 'react-native';
import {Icon, CheckBox} from '@rneui/themed';
import _ from 'lodash';
import { theme } from '@themes';

const ScopeSelector = (props: {
  scopes: any;
  editable: any;
  defaultScopes: any;
  modelValue: any;
  setCurrent: (value: any) => void;
  current: any;
}) => {
  const [keyword, setKeyword] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [scopesTree, setScopesTree] = useState<any>([]);
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const treeRef = useRef(null);

  let {scopes, editable, defaultScopes, modelValue, setCurrent, current} =
    props;

  useEffect(() => {
    const allScopes = Object.entries(scopes).reduce(
      (accumulator: any, [key, value]) => {
        const keyParts = key.split(':');
        if (keyParts.length <= 1) return accumulator;

        const groupKey = keyParts[0];
        const group: any = accumulator.find((o: any) => o.key === groupKey);

        const isDisabled = !editable || defaultScopes.includes(key);

        if (group) {
          group.children.push({key, label: value, disabled: isDisabled});
        } else {
          accumulator.push({
            key: groupKey,
            label: groupKey.charAt(0).toUpperCase() + groupKey.slice(1),
            disabled: !editable || defaultScopes.includes(groupKey),
            children: [{key, label: value, disabled: isDisabled}],
          });
        }
        return accumulator;
      },
      [],
    );
    setScopesTree(allScopes);
  }, [scopes, editable, defaultScopes]);

  useEffect(() => {
    if (modelValue) {
      const modelKeys = modelValue.split(' ');
      const unionKeys: any = _.union(defaultScopes, modelKeys);
      setCheckedKeys(unionKeys);
    } else {
      setCheckedKeys(defaultScopes);
    }
  }, [modelValue, defaultScopes]);

  const handleSelectAll = () => {
    if (!selectAll) {
      setCheckedKeys(Object.keys(scopes));
      const selectedScopes = Object.keys(scopes);
      setCurrent({...current, scope: selectedScopes.join(' ')});
    } else {
      setCheckedKeys(defaultScopes);
      const selectedScopes = defaultScopes;
      setCurrent({...current, scope: selectedScopes.join(' ')});
    }
  };

  const filterNodes = (value: string, data: any) => {
    if (!value) return true;
    return data.label.toLowerCase().includes(value.toLowerCase());
  };

  const onScopeChanged = (selectedKey: any) => {
    setCheckedKeys((prev: any) =>
      prev.includes(selectedKey)
        ? prev.filter((key: any) => key !== selectedKey)
        : [...prev, selectedKey],
    );

    const selectedScopes = checkedKeys.includes(selectedKey)
      ? checkedKeys.filter((key: any) => key !== selectedKey)
      : [...checkedKeys, selectedKey];

    setCurrent({...current, scope: selectedScopes.join(' ')});
  };

  const filteredTree = scopesTree.filter((node: any) =>
    filterNodes(keyword, node),
  );

  return (
    <View>
      <View
        style={{
          width: Dimensions.get('window').width - 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: 15,
        }}>
        <TextInput
          style={{
            flex: 1,
            padding: 10,
            borderWidth: 1,
            borderColor: theme.lightColors?.greyOutline,
            borderRadius: 4,
            color: theme.lightColors?.black,
            minWidth: 150,
          }}
          placeholder="Search"
          value={keyword}
          onChangeText={setKeyword}
          placeholderTextColor={theme.lightColors?.black}
        />

        <Icon
          name="search"
          type="font-awesome"
          size={20}
          color={theme.lightColors?.searchBg}
          style={{marginLeft: 10, marginRight: 10}}
        />

        {editable && (
          <CheckBox
            checked={selectAll}
            onPress={() => {
              setSelectAll(!selectAll);
              handleSelectAll();
            }}
          />
        )}
      </View>

      <View>
        {filteredTree.map(
          (item: {
            key: React.Key | null | undefined;
            label:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            children: any[];
          }) => (
            <View key={item.key}>
              <Text style={{color: theme.lightColors?.grey0}}>{item.label}</Text>
              {item.children.map(child => (
                <View
                  key={child.key}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox
                    checked={checkedKeys.includes(child.key)}
                    disabled={child.disabled}
                    disabledStyle={{backgroundColor: theme.lightColors?.disabled}}
                    onPress={() => onScopeChanged(child.key)}
                  />
                  <Pressable
                    disabled={child.disabled}
                    onPress={() => onScopeChanged(child.key)}>
                    <Text style={{color: theme.lightColors?.grey0}}>{child.label}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ),
        )}
      </View>
    </View>
  );
};

export default ScopeSelector;
