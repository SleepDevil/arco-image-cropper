import { Upload, Message, Modal } from '@arco-design/web-react';
import React from 'react';
import { ImageCropUploaderProps } from './interface';
import { Cropper } from './Cropper';

export default function ImageUploader(props: ImageCropUploaderProps) {
  const {
    accept = "image/*",
    action = '/',
    shape = 'rect',
    aspect = 1,
    rotate = false,
    fixAspect = false,
    rotateRatio = 1,
    quality = 1,
    modalTitle = "裁剪图片",
    modalWidth = 520,
    modalOk = "确定",
    modalCancel = "取消",
    cropperProps,
    modalProps
  } = props;

  const readFile = (file): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        }
      }, false)
      reader.readAsDataURL(file)
    })
  }

  return (
    <div>
      <Upload
        accept={accept}
        listType="picture-card"
        action={action}
        onPreview={file => {
          console.log(file, 'previewFile')
          Modal.info({
            title: '预览',
            content: <div className='text-center'>
              <img src={file.url || URL.createObjectURL(file.originFile)} />
            </div>
          })
        }}
        beforeUpload={(file) => {
          return new Promise(async (resolve) => {
            let img = await readFile(file)
            const modal = Modal.confirm({
              title: modalTitle,
              onCancel: () => {
                Message.info('取消上传');
                resolve(false);
                modal.close();
                props?.onModalCancel?.()
              },
              simple: false,
              content: (
                <Cropper
                  modalCancel={modalCancel}
                  modalOk={modalOk}
                  fixAspect={fixAspect}
                  imgType={file.type}
                  quality={quality}
                  image={img}
                  onModalOk={(croppedFile) => {
                    resolve(croppedFile);
                    modal.close();
                    props?.onModalOk?.(croppedFile)
                  }}
                  onModalCancel={() => {
                    Message.info('取消上传');
                    resolve(false);
                    modal.close();
                    props?.onModalCancel?.()
                  }}
                  aspect={aspect}
                  shape={shape}
                  cropperProps={cropperProps}
                  rotate={rotate}
                  rotateRatio={rotateRatio}
                />
              ),
              footer: null,
              style: { width: modalWidth },
              ...modalProps,
            });
          });
        }}
      />
    </div>
  );
}
