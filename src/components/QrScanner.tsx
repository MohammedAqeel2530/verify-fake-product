import React, { useEffect, useRef } from "react";

type Props = {
  onScan: (decodedText: string) => void;
  onError?: (error: any) => void;
  fps?: number;
  qrbox?: number;
};

export default function QrScanner({ onScan, onError, fps = 10, qrbox = 250 }: Props) {
  const divId = useRef(`qr-reader-${Math.random().toString(36).slice(2)}`).current;
  const html5QrCodeRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let started = false;

    import("html5-qrcode")
      .then((mod) => {
        if (!mounted) return;
        const Html5Qrcode = mod.Html5Qrcode;
        html5QrCodeRef.current = new Html5Qrcode(divId);
        return Html5Qrcode.getCameras();
      })
      .then((cameras: any) => {
        if (!mounted) return;
        const cameraId = cameras && cameras.length ? cameras[0].id : undefined;
        if (!cameraId) {
          onError?.(new Error("No camera found"));
          return;
        }
        started = true;
        html5QrCodeRef.current
          .start(
            cameraId,
            { fps, qrbox },
            (decodedText: string) => onScan(decodedText),
            (err: any) => onError?.(err)
          )
          .catch((startErr: any) => onError?.(startErr));
      })
      .catch((err: any) => onError?.(err));

    return () => {
      mounted = false;
      if (started && html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .catch(() => {})
          .finally(() => html5QrCodeRef.current?.clear().catch(() => {}));
      }
    };
  }, [divId, fps, qrbox, onScan, onError]);

  return <div id={divId} style={{ width: "100%", maxWidth: 480 }} />;
}