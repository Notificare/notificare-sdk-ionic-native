import './ExploreContainer.css';
import { Notificare } from 'capacitor-notificare';
import type { FC } from 'react';

const ExploreContainer: FC = () => {
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
          const result = await Notificare.echo({ value: 'Hello' });
          console.log('=== result ===');
          console.log(result);
        }}
      >
        Click me!
      </button>
    </div>
  );
};

export default ExploreContainer;
