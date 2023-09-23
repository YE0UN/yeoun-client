import GlobalStyle from './styles/GlobalStyle';
import AuthContext from './context/AuthContext';
import Layout from './components/common/layout/Layout/Layout';
import Router from './components/routes/Router';
import GlobalSVGSprite from './components/SVGSprite/GlobalSVGSprite';

function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalSVGSprite />
      <AuthContext>
        <Layout>
          <Router />
        </Layout>
      </AuthContext>
    </>
  );
}

export default App;
