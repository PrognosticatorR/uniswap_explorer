import Header from './components/Header';
import Main from './components/Main';

const style = {
  wrapper: `h-screen h-min-screen h-auto w-screen bg-[#2D242F] text-white select-none flex flex-col flex-start`
};

const Home = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <Main />
    </div>
  );
};

export default Home;
