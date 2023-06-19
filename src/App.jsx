import GlobalStyle from './styles/GlobalStyle';
import { Button } from './components/buttons/Button';
function App() {
  return (
    <>
      <GlobalStyle />
      <p>hello</p>
      <Button size='lg'>로그인</Button>
      <Button size='md'>회원가입</Button>
      <Button size='sm'>전국</Button>
    </>
  );
}

export default App;
