import { Button, Grid, Slider } from '@arco-design/web-react';
import { IconRotateLeft, IconRotateRight } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import ReactCropper from 'react-cropper';
import { ImageCropUploaderProps } from './interface';
import 'cropperjs/dist/cropper.css';

interface CropperProps
  extends Required<
    Pick<
      ImageCropUploaderProps,
      | 'onModalOk'
      | 'onModalCancel'
      | 'shape'
      | 'aspect'
      | 'fixAspect'
      | 'rotateRatio'
      | 'cropperProps'
      | 'rotate'
      | 'quality'
      | 'modalCancel'
      | 'modalOk'
      | 'zoomOnWheel'
    >
  > {
  image: string;
  imgType: string;
}

const Cropper = (props: CropperProps) => {
  const {
    image,
    shape,
    aspect,
    imgType,
    fixAspect,
    rotate,
    rotateRatio,
    cropperProps,
    quality,
    modalCancel,
    modalOk,
    zoomOnWheel,
  } = props;
  const CropperInstance = useRef(null);
  const [rotation, setRotation] = useState(0);
  const cropperRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (shape === 'round') {
      document.styleSheets[0].insertRule(`.cropper-view-box,
            .cropper-face {
                border-radius: 50%;
            }`);
    }
  }, [image]);

  const dataURItoBlob = (dataURI) => {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  return (
    <div>
      <div className="h-[280px] relative">
        <ReactCropper
          className="h-[280px]"
          initialAspectRatio={aspect}
          aspectRatio={fixAspect ? aspect : NaN}
          src={image}
          ref={cropperRef}
          guides={false}
          ready={() => {
            CropperInstance.current = (cropperRef.current as any).cropper;
          }}
          zoomOnWheel={zoomOnWheel}
          {...cropperProps}
        />
      </div>
      {rotate && (
        <Grid.Row className="mt-4" justify="space-between">
          <Grid.Row className="ml-2 mr-2 flex-1">
            <IconRotateLeft
              className="mr-4"
              onClick={() => {
                setRotation(rotation - rotateRatio);
                CropperInstance.current.rotate(-rotateRatio);
              }}
            />
            <Slider
              className="flex-1"
              step={1}
              value={rotation}
              onChange={(v: number) => {
                setRotation(v);
                CropperInstance.current.rotateTo(v);
              }}
              min={0}
              max={360}
            />
            <IconRotateRight
              className="ml-4"
              onClick={() => {
                setRotation(rotation + rotateRatio);
                CropperInstance.current.rotate(rotateRatio);
              }}
            />
          </Grid.Row>
        </Grid.Row>
      )}

      <Grid.Row className="mt-8" justify="end">
        <Button className="mr-8" onClick={props.onModalCancel}>
          {modalCancel}
        </Button>
        <Button
          type="primary"
          onClick={() => {
            const fileBlob = dataURItoBlob(
              CropperInstance.current.getCroppedCanvas().toDataURL(imgType, quality)
            );
            const croppedFile = new File([fileBlob], 'croppedimage', {
              type: imgType || 'image/*',
            });
            props.onModalOk(croppedFile);
          }}
        >
          {modalOk}
        </Button>
      </Grid.Row>
    </div>
  );
};

export { Cropper };
