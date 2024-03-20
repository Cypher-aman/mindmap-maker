import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { IoMdClose } from 'react-icons/io';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Node Details',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

interface ModalProps {
  open: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ open, setClose }) => {
  if (!open) return null;
  return (
    <React.Fragment>
      <div className="fixed inset-0 z-10 top-0 left-0 right-0 bottom-0 bg-black/70"></div>
      <div className="fixed inset-0 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  max-w-[95%] w-[500px] h-fit bg-white rounded">
        <div className="py-5 px-3 h-full">
          <Bar
            width={100}
            height={50}
            className=""
            options={options}
            data={data}
          />
        </div>
        <button
          onClick={() => setClose(false)}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          {' '}
          <IoMdClose />{' '}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Modal;
