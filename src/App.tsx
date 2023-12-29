import { useDark } from './hooks/useDark';
import ReactSvg from '@/assets/react.svg?react';

function App() {
  const [isDark, toggleTheme] = useDark();

  return (
    <div className="h-screen w-screen">
      <ReactSvg />
      <button className="btn" onClick={toggleTheme}>theme</button>
      {isDark ? 'dark' : 'light'}
    </div>
  );
}

export default App;
