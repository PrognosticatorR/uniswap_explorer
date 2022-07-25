import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface PaginationProps {
  className?: string;
  totalItems: number;
  pageSize: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const style = {
  wrapper: `flex items-center justify-center mt-8 m-auto`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-center text-xl mb-10`,
  button: `bg-white border border-[#163256] hover:border-[#234169] h-full font-semibold rounded-xl flex items-center justify-center text-gray-500 py-1 px-3 m-auto mx-2`,
  input: `w-20 max-w-[100%] text-gray-500 py-1 px-2 mx-2 border-[#163256]`
};
export const Pagination: React.FunctionComponent<PaginationProps> = props => {
  const { totalItems, pageSize } = props;
  const pageInput = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const totalPages = Math.ceil(totalItems / pageSize);
  const [inputVal, setIntputVal] = React.useState(props.currentPage || '1');

  const handlePrevClick = () => {
    if (props.currentPage > 1) {
      props.handlePageChange(props.currentPage - 1);
      setIntputVal(props.currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (props.currentPage < totalPages) {
      props.handlePageChange(props.currentPage + 1);
      setIntputVal(props.currentPage + 1);
    }
  };

  const handleInputChange = (e: any) => {
    setIntputVal(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let newVal = parseInt(inputVal as string, 10);
    // Handle too low number
    if (newVal < 1) {
      newVal = 1;
    }
    // Handle too high number
    if (newVal > totalPages) {
      newVal = totalPages;
    }
    props.handlePageChange(newVal);
    setIntputVal(newVal);
    // Blur input on submit
    pageInput.current!.blur();
  };

  return (
    <form className={style.wrapper} onSubmit={handleSubmit}>
      <button
        className={`${style.button}`}
        onClick={handlePrevClick}
        type={'button'}
        aria-label={'Previous'}
        disabled={props.currentPage <= 1}
      >
        <FiArrowLeft size={20} fontWeight={600} />
      </button>
      <span className="text pageText">Page:</span>
      <input className={style.input} type="number" value={inputVal} onChange={handleInputChange} ref={pageInput} />
      <span className="text">of {totalPages}</span>
      <button
        className={`${style.button}`}
        onClick={handleNextClick}
        type={'button'}
        aria-label={'Next'}
        disabled={props.currentPage >= totalPages}
      >
        <FiArrowRight size={20} fontWeight={600} />
      </button>
    </form>
  );
};
