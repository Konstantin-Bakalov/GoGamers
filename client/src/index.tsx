import { createRoot } from 'react-dom/client';
import { App } from './app';

const container = document.getElementById('root');
// We know the container exists
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(<App />);
