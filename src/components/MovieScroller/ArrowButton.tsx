import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type ArrowButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  arrowStyle: string;
  arrowSize: number;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick, arrowStyle, arrowSize }) => {
  return (
    <div className='flex items-center hover:bg-gray-300 hover:rounded-full mx-2'>
      {direction === 'left' ? (
        <MdChevronLeft className={arrowStyle} onClick={onClick} size={arrowSize} />
      ) : (
        <MdChevronRight className={arrowStyle} onClick={onClick} size={arrowSize} />
      )}
    </div>
  );
};

export default ArrowButton;
