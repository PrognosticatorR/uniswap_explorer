import { css } from '@emotion/react';
import { MoonLoader } from 'react-spinners';

const style = {
  wrapper: `text-white w-100 flex flex-col justify-center items-center m-auto h-screen h-min-screen -mt-14`,
  title: `font-semibold text-xl mb-12`
};

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const TransactionLoader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Loading Transaction in progress...</div>
      <MoonLoader color={'#fff'} loading={true} css={cssOverride} size={50} />
    </div>
  );
};

export default TransactionLoader;
