import { IonCard } from '@ionic/react';
import type { NotificareAsset } from 'capacitor-notificare-assets';
import type { FC } from 'react';
import '../../../styles/index.css';

import { DataFieldView } from '../../../components/data-field/data_field_view';

import { AssetUrlContentFieldView } from './asset_url_content_field_view';

export const AssetDetailsView: FC<{ asset: NotificareAsset }> = (props: { asset: NotificareAsset }) => {
  return (
    <IonCard className="margin-top">
      <DataFieldView label={'Title'} value={props.asset.title} />

      <DataFieldView label={'Description'} value={props.asset.description} />

      <DataFieldView label={'Key'} value={props.asset.key} />

      <AssetUrlContentFieldView label={'Url'} url={props.asset.url} />

      <DataFieldView label={'Button label'} value={props.asset.button?.label} />

      <DataFieldView label={'Button Action'} value={props.asset.button?.action} />

      <DataFieldView label={'Content type'} value={props.asset.metaData?.contentType} />

      <DataFieldView label={'Original File Name'} value={props.asset.metaData?.originalFileName} />

      <DataFieldView label={'Content Length'} value={props.asset.metaData?.contentLength.toString()} />

      <DataFieldView
        label={'Extra'}
        value={Object.keys(props.asset.extra).length > 0 ? '' : null}
        removeDivider={true}
      />

      {Object.entries(props.asset.extra).map(([label, value], index) => {
        return (
          <DataFieldView
            label={label}
            value={value}
            removeDivider={index + 1 === Object.entries(props.asset.extra).length}
          />
        );
      })}
    </IonCard>
  );
};
