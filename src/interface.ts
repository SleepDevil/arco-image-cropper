import Cropper from "cropperjs";
import { ConfirmProps } from "@arco-design/web-react/es/Modal/confirm";
import { UploaderProps } from "@arco-design/web-react/es/Upload/interface";

/**
 * @title ImageCropUploader
 */
export interface ImageCropUploaderProps extends UploaderProps {
  /**
   * @zh 上传服务器接口地址
   * @en Uploading url
   */
  action: string;
  /**
   * @zh 宽度与高度的比例
   * @en Aspect of crop area , width / height
   */
  aspect?: number;
  /**
   * @zh 接受文件类型
   * @en type of accept file
   */
  accept?: string;
  /**
   * @zh 是否固定长宽比
   * @en whether to fix aspect ratio of the crop box
   * @defaultValue false
   */
  fixAspect?: boolean;
  /**
   * @zh 裁剪区形状
   * @en Shape of crop area
   * @defaultValue 'react'
   */
  shape?: 'rect' | 'round';
  /**
   * @zh 图片质量
   * @en Quality of cropped image
   * @defaultValue 1
   */
  quality?: number;
  /**
     * @zh 是否允许鼠标滚轮缩放图片
     * @en Whether to zoom the image by mouse wheeling.
     * @defaultValue true
     */
  zoomOnWheel?: boolean; // 滚轴滚动缩放图片
  /**
   * @zh 是否需要旋转图片
   * @en Need to rotate the picture
   * @defaultValue false
   */
  rotate?: boolean; // 是否需要旋转图片
  /**
     * @zh 滚轮放大倍率
     * @en zoom ratio when zooming the image by mouse wheeling
     * @defaultValue 0.1
     */
  wheelZoomRatio?: number;
  /**
     * @zh 一次性旋转角度
     * @en rotate angle on click icon
     * @defaultValue 1
     */
  rotateRatio?: number;
  /**
       * @zh 裁剪对话框标题
       * @en title of the crop modal
       * @defaultValue 1
       */
  modalTitle?: string;
  /**
     * @zh 裁剪对话框宽度
     * @en width of crop modal
     * @defaultValue 1
     */
  modalWidth?: number | string;
  /**
     * @zh 确认按钮文字
     * @en content of ok button
     * @defaultValue '确定'
     */
  modalOk?: string;
  /**
     * @zh 取消按钮文字
     * @en content of cancel button
     * @defaultValue '取消'
     */
  modalCancel?: string;
  /**
     * @zh 点击确定后自定义回调函数
     * @en callback after click ok
     */
  onModalOk?: (file: File) => void;
  /**
     * @zh 点击取消后自定义回调函数
     * @en callback after click cancel
     */
  onModalCancel?: () => void;

//   beforeCrop?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
//   onUploadFail?: (err: Error) => void;
  /**
     * @zh 裁剪组件额外属性
     * @en additional props of crop component
     * @defaultValue see also [cropperjs](https://github.com/fengyuanchen/cropperjs#options)
     */
  cropperProps?: Partial<Cropper.Options>;
  /**
     * @zh 对话框额外属性
     * @en additional props of modal component
     * @defaultValue see also [modal](https://arco.design/react/components/modal#api)
     */
  modalProps?: Partial<Omit<ConfirmProps, 'content'>>
}