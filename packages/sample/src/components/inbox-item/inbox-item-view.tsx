import { IonImg } from '@ionic/react';
import type { NotificareNotificationAttachment } from 'capacitor-notificare';
import type { NotificareInboxItem } from 'capacitor-notificare-inbox';
import { formatDistanceToNow } from 'date-fns';
import type { FC } from 'react';
import './inbox-item-style.css';

export const InboxItemView: FC<InboxItemProps> = ({ item }) => {
  return (
    <div className="inbox-item-container">
      <div className="inbox-item-attachment-container">
        {item.notification.attachments.length > 0 ? (
          <Attachment attachment={item.notification.attachments[0]} />
        ) : (
          <div className="inbox-item-empty-attachment"></div>
        )}
      </div>

      <div className="inbox-item-details-container">
        <div className="inbox-item-caption">{formatDistanceToNow(Date.parse(item.time))} ago</div>

        <span className="inbox-item-title">{item.notification.title ?? '---'}</span>

        <span className="inbox-item-message">{item.notification.message}</span>

        <span className="inbox-item-caption">{item.notification.type}</span>
      </div>

      <div className="inbox-item-unread-container">
        {!item.opened && <div className="inbox-item-unread-indicator" />}
      </div>
    </div>
  );
};

export interface InboxItemProps {
  item: NotificareInboxItem;
}

const Attachment: FC<AttachmentProps> = ({ attachment }) => {
  return <IonImg src={attachment.uri} className="inbox-item-attachment-image" />;
};

interface AttachmentProps {
  attachment: NotificareNotificationAttachment;
}
