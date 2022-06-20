import Cropper from "cropperjs";
import { ConfirmProps } from "@arco-design/web-react/es/Modal/confirm";

/**
 * @title ImageCropUploader
 */
export interface ImageCropUploaderProps {
  /**
   * @zh 宽度与高度的比例
   * @en Aspect of crop area , width / height
   */
  aspect?: number;
  /**
   * @zh 是否固定长宽比
   * @en Aspect of crop area , width / height
   * @defaultValue false
   */
  fixAspect?: boolean;
  /**
   * @zh 裁剪区形状
   * @en shape of crop area
   * @defaultValue 'react'
   */
  shape?: 'rect' | 'round';
  /**
   * @zh 图片质量
   * @en quality of cropped image
   * @defaultValue 1
   */
  quality?: number;
  
  fillColor?: string;

  zoomOnWheel?: boolean; // 滚轴滚动缩放图片
  rotate?: boolean; // 是否需要旋转图片
  minZoom?: number;
  maxZoom?: number;

  wheelZoomRatio?: number;
  rotateRatio?: number;

  modalTitle?: string;
  modalWidth?: number | string;
  modalOk?: string;
  modalCancel?: string;
  onModalOk?: (file: string | Blob | File) => void;
  onModalCancel?: () => void;

  beforeCrop?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  onUploadFail?: (err: Error) => void;
  cropperProps?: Partial<Cropper.Options>;
  modalProps?: Partial<Omit<ConfirmProps, 'content'>>
}