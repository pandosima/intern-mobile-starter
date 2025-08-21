import {connect} from 'react-redux';
import Main from '../screens/Main';
const mapStateToProps = state => ({
  authenticated:
    state.oauth &&
    state.oauth.tokenInfo &&
    state.oauth.tokenInfo.access_token &&
    state.oauth.tokenInfo.access_token.length > 0,
});

export default connect(mapStateToProps)(Main);
