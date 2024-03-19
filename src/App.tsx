import MindMap from './components/node';
import { Toaster } from 'react-hot-toast';
import ReactFlowEl from './providers/ReactFlowEl';
import { AiFillHome } from 'react-icons/ai';

const App = () => {
  return (
    <main className="grid grid-cols-[auto_1fr]">
      <nav className="h-screen bg-violet-500 py-8 shadow">
        <ul>
          <li className="bg-white p-3 text-xl text-violet-500">
            <a href="/" className="">
              <AiFillHome />
            </a>
          </li>
        </ul>
      </nav>
      <ReactFlowEl>
        <div className="">
          <MindMap />
          <Toaster />
        </div>
      </ReactFlowEl>
    </main>
  );
};

export default App;
