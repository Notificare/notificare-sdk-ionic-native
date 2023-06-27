import type { NotificareBeacon } from 'capacitor-notificare-geo';
import type { FC } from 'react';
import './beacon_style.css';

export const BeaconView: FC<BeaconProps> = ({ beacon }) => {
  return (
    <div>
      <div className="beacon-details-container">
        <span className="beacon-title">{beacon.name}</span>

        <span className="beacon-message">
          {beacon.major}:{beacon.minor}
        </span>

        <span className="beacon-caption">{beacon.id}</span>

        <span className="beacon-caption">{beacon.proximity}</span>
      </div>
    </div>
  );
};

export interface BeaconProps {
  beacon: NotificareBeacon;
}
