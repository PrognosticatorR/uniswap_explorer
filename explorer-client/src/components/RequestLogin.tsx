import { useContext } from 'react';
import MetamakLogo from '../assests/Metamask-icon.png';
import { TransactionContext } from '../context/AuthContext';
const RequestLogin = () => {
  const { connectWallet } = useContext(TransactionContext);

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <h2 className={style.formHeader}>Please login to see transactions history.</h2>
        <button onClick={() => connectWallet()} className={style.buttonAccent}>
          Login With Metamask
          <img
            className={`flex w-1/16 items-center justify-start ml-4`}
            height={20}
            width={20}
            src={MetamakLogo}
            alt="metanask"
          />{' '}
        </button>
      </div>
    </div>
  );
};

const style = {
  wrapper: `w-screen flex items-center justify-center h-screen h-min-screen -mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-center text-xl mb-10`,
  buttonAccent: `bg-[##2172E5] border border-[#163256] hover:border-[#234169] h-full font-semibold rounded-2xl flex items-center justify-center text-[#4F90EA] py-5 px-7 m-auto mt-10 `
};

export default RequestLogin;
