import GlobalStyle from './styles/GlobalStyle';
import AuthContext from './context/AuthContext';
import Layout from './components/common/layout/Layout/Layout';
import Router from './components/routes/Router';

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthContext>
        <Layout>
          <Router />
        </Layout>
      </AuthContext>
    </>
  );
}

export default App;
