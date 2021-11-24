import {Text} from 'react-native';

function Home(props) {
  if (props.authState === 'verifyContact') {
    return <Text>Welcome</Text>;
  } else {
    return <></>;
  }
}

export default Home;
