import { Button, Grid, Slider } from "@arco-design/web-react";
import { IconRotateLeft, IconRotateRight } from "@arco-design/web-react/icon";
import React, { useEffect, useRef, useState } from "react";
import { ImageCropUploaderProps } from "./interface";
import ReactCropper from "react-cropper";
import './style/index.less'
import "./style/index.css"

interface CropperProps extends Required<
    Pick<ImageCropUploaderProps, 'onModalOk' | 'onModalCancel' | 'shape' | 'aspect' | 'fixAspect' | 'rotateRatio' | 'cropperProps' | 'rotate' | 'quality'>
> {
    image: string;
    imgType: string;
}

const Cropper = (props: CropperProps) => {
    const { image, shape, aspect, imgType, fixAspect, rotate, rotateRatio, cropperProps, quality } = props;
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
            <div className="h-[280px] relative">
                <ReactCropper
                    className="h-[280px]"
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
            {rotate && <Grid.Row className="mt-4" justify="space-between">
                <Grid.Row className="ml-2 mr-2 flex-1" >
                    <IconRotateLeft
                        className="mr-4"
                        onClick={() => {
                            setRotation(rotation - rotateRatio)
                            CropperInstance.current.rotate(-rotateRatio)
                        }}
                    />
                    <Slider
                        className="flex-1"
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
                        className="ml-4"
                        onClick={() => {
                            setRotation(rotation + rotateRatio)
                            CropperInstance.current.rotate(rotateRatio)
                        }}
                    />
                </Grid.Row>
            </Grid.Row>}

            <Grid.Row className="mt-4" justify="end">
                <Button
                    className="mr-8"
                    onClick={props.onModalCancel}
                >
                    取消
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
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