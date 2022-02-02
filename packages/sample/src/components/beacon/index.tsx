import type { NotificareBeacon } from 'capacitor-notificare-geo';
import type { FC } from 'react';

import './index.css';

export const Beacon: FC<BeaconProps> = ({ beacon }) => {
  return (
    <div>
      <div className="details-container">
        <span className="title">{beacon.name}</span>
        <span className="message">
          {beacon.major}:{beacon.minor}
        </span>
        <span className="caption">{beacon.id}</span>
        <span className="caption">{beacon.proximity}</span>
      </div>
    </div>
  );
};

export interface BeaconProps {
  beacon: NotificareBeacon;
}
