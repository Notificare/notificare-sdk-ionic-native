import { IonCard } from '@ionic/react';
import type { NotificareAsset } from 'capacitor-notificare-assets';
import type { FC } from 'react';
import '../../../styles/index.css';

import { DataFieldView } from '../../../components/data-field/data-field-view';

import { AssetUrlContentFieldView } from './asset-url-content-field-view';

type AssetDetailsProps = {
  asset: NotificareAsset;
};

export const AssetDetailsView: FC<AssetDetailsProps> = ({ asset }) => {
  return (
    <IonCard className="margin-top">
      <DataFieldView label={'Title'} value={asset.title} />

      <DataFieldView label={'Description'} value={asset.description} />

      <DataFieldView label={'Key'} value={asset.key} />

      <AssetUrlContentFieldView label={'Url'} url={asset.url} />

      <DataFieldView label={'Button label'} value={asset.button?.label} />

      <DataFieldView label={'Button Action'} value={asset.button?.action} />

      <DataFieldView label={'Content type'} value={asset.metaData?.contentType} />

      <DataFieldView label={'Original File Name'} value={asset.metaData?.originalFileName} />

      <DataFieldView label={'Content Length'} value={asset.metaData?.contentLength.toString()} />

      <DataFieldView label={'Extra'} value={Object.keys(asset.extra).length > 0 ? '' : null} removeDivider={true} />

      {Object.entries(asset.extra).map(([label, value], index) => {
        return (
          <DataFieldView label={label} value={value} removeDivider={index + 1 === Object.entries(asset.extra).length} />
        );
      })}
    </IonCard>
  );
};
