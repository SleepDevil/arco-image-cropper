import { Button, Grid, Slider } from "@arco-design/web-react";
import { IconRotateLeft, IconRotateRight } from "@arco-design/web-react/icon";
import React, { useEffect, useRef, useState } from "react";
import { ImageCropUploaderProps } from "./interface";
import ReactCropper from "react-cropper";
import "cropperjs/dist/cropper.css";



interface CropperProps extends Required<
    Pick<ImageCropUploaderProps, 'onModalOk' | 'onModalCancel' | 'shape' | 'aspect' | 'fixAspect' | 'rotateRatio' | 'cropperProps' | 'rotate' | 'quality'>
> {
    image: string;
    imgType: string;
}

const Cropper = (props: CropperProps) => {
    const { image, shape, aspect, imgType, fixAspect, rotateRatio, cropperProps, quality } = props;
    let CropperInstance = useRef<Cropper>(null);
    const [rotation, setRotation] = useState(0);
    const cropperRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (shape === 'round') {
            document.styleSheets[0].insertRule(`.cropper-view-box,
            .cropper-face {
                border-radius: 50%;
            }`)
        }
    }, [image])

    return (
        <div>
            <div style={{ width: '100%', height: 280, position: 'relative' }}>
                <ReactCropper
                    style={{ width: '100%', height: 280 }}
                    initialAspectRatio={aspect}
                    aspectRatio={fixAspect ? aspect : NaN}
                    src={image}
                    ref={cropperRef}
                    guides={false}
                    ready={() => {
                        CropperInstance.current = (cropperRef.current as any).cropper
                    }}
                    {...cropperProps}
                />
            </div>
            <Grid.Row justify="space-between" style={{ marginTop: 20, marginBottom: 20 }}>
                <Grid.Row style={{ flex: 1, marginLeft: 12, marginRight: 12 }}>
                    <IconRotateLeft
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            setRotation(rotation - rotateRatio)
                            CropperInstance.current.rotate(-rotateRatio)
                        }}
                    />
                    <Slider
                        style={{ flex: 1 }}
                        step={1}
                        value={rotation}
                        onChange={(v: number) => {
                            setRotation(v);
                            CropperInstance.current.rotateTo(v)
                        }}
                        min={0}
                        max={360}
                    />
                    <IconRotateRight
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            setRotation(rotation + rotateRatio)
                            CropperInstance.current.rotate(rotateRatio)
                        }}
                    />
                </Grid.Row>
            </Grid.Row>

            <Grid.Row justify="end">
                <Button
                    onClick={props.onModalCancel}
                    style={{ marginRight: 20 }}>
                    取消
                </Button>
                <Button
                    type="primary"
                    onClick={async () => {
                        props.onModalOk(CropperInstance.current.getCroppedCanvas().toDataURL(imgType, quality))
                    }}
                >
                    确定
                </Button>
            </Grid.Row>
        </div>
    );
};

export { Cropper }