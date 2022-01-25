import { Notificare } from 'capacitor-notificare';
import type { FC } from 'react';

import './index.css';

export const ExploreContainer: FC = () => {
  return (
    <div className="container">
      <strong>Ready to create an app?</strong>
      <p>
        Start with Ionic{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">
          UI Components
        </a>
      </p>

      <button
        onClick={async () => {
          console.log('=== calling === method ===');
          const result = await Notificare.getApplication();
          console.log('=== result ===');
          console.log(JSON.stringify(result, null, 2));
        }}
      >
        Click me!
      </button>
    </div>
  );
};
