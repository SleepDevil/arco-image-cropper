import React from 'react';
import ImageUploader from '@arco-materials/upload-crop';

export default () => {
  return (
    <div>
      <ImageUploader
        customRequest={(opt) => {
          // eslint-disable-next-line no-console
          console.log(opt);
        }}
      />
    </div>
  );
};
