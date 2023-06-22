import GlobalStyle from './styles/GlobalStyle';
import Carousel from './components/Carousel/Carousel';
import Layout from './components/common/layout/Layout/Layout';
import SignupPage from './pages/SignupPage/SignupPage';
// import ScrapModal from './components/common/Modal/ScrapModal';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Carousel />
        {/* <ScrapModal /> */}
        <SignupPage />
      </Layout>
      <p>hello</p>
    </>
  );
}

export default App;
