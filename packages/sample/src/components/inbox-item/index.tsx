import { IonImg } from '@ionic/react';
import type { NotificareNotificationAttachment } from 'capacitor-notificare';
import type { NotificareInboxItem } from 'capacitor-notificare-inbox';
import { formatDistanceToNow } from 'date-fns';
import type { FC } from 'react';

import './index.css';

export const InboxItem: FC<InboxItemProps> = ({ item }) => {
  return (
    <div className="container">
      {item.notification.attachments.length > 0 && (
        <div className="attachment-container">
          <Attachment attachment={item.notification.attachments[0]} />
        </div>
      )}

      <div className="details-container">
        <span className="title">{item.notification.title ?? '---'}</span>
        <span className="message">{item.notification.message}</span>
        <span className="caption">{item.notification.type}</span>
      </div>

      <div className="unread-container">
        <div className="caption">{formatDistanceToNow(Date.parse(item.time))}</div>
        {!item.opened && <div className="unread-indicator" />}
      </div>
    </div>
  );
};

export interface InboxItemProps {
  item: NotificareInboxItem;
}

const Attachment: FC<AttachmentProps> = ({ attachment }) => {
  return <IonImg src={attachment.uri} className="attachment-image" />;
};

interface AttachmentProps {
  attachment: NotificareNotificationAttachment;
}
