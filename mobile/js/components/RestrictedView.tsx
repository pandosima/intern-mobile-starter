import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from '../hooks';

interface Props {
  allScopes?: string[] | null;
  oneOfScopes?: string[] | null;
  children?: React.ReactNode;
}

export const hasAllScopes = (_scopes: any[]) => {
  const tokenInfo = useAppSelector(state => state.oauth.tokenInfo);
  const {scopes} = tokenInfo;
  if (!scopes || scopes.length === 0) {
    return false;
  }
  return !_scopes.some(n => {
    return scopes.indexOf(n) === -1;
  });
};
export const hasOneOfScopes = (_scopes: any[]) => {
  const tokenInfo = useAppSelector(state => state.oauth.tokenInfo);
  const {scopes} = tokenInfo;
  if (!scopes || scopes.length === 0) {
    return false;
  }
  return _scopes.some(n => {
    return scopes.indexOf(n) !== -1;
  });
};

const RestrictedView: React.FC<Props> = ({
  allScopes = null,
  oneOfScopes = null,
  children,
}) => {
  return (
    <View>
      {allScopes && hasAllScopes(allScopes) ? (
        <>{children}</>
      ) : oneOfScopes && hasOneOfScopes(oneOfScopes) ? (
        <>{children}</>
      ) : null}
    </View>
  );
};

export default RestrictedView;
