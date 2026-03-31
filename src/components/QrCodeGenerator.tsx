import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Copy, X } from "lucide-react";
import QRCode from "qrcode";

type Props = {
  productId?: string;
  productName?: string;
  onGenerate?: (dataUrl: string) => void;
};

export default function QrCodeGenerator({ productId = "", productName = "", onGenerate }: Props) {
  const [inputValue, setInputValue] = useState(productId || "");
  const [qrCode, setQrCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generateQR = async () => {
    if (!inputValue.trim()) {
      alert("Please enter a product ID or value to encode");
      return;
    }

    setIsLoading(true);
    try {
      const dataUrl = await QRCode.toDataURL(inputValue, {
        width: 300,
        margin: 2,
        color: {
          dark: "#00ffff",
          light: "#1a1a1a",
        },
      });
      setQrCode(dataUrl);
      onGenerate?.(dataUrl);
    } catch (err) {
      console.error("QR Code generation failed:", err);
      alert("❌ Failed to generate QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qr-${inputValue || "code"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputValue);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearQR = () => {
    setQrCode("");
    setInputValue("");
    setIsCopied(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Product ID / Value to Encode:
        </label>
        <input
          type="text"
          placeholder="e.g., PROD-123456 or your product URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") generateQR();
          }}
          className="w-full p-3 rounded border border-primary/20 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <Button
        variant="cyber"
        size="lg"
        className="w-full"
        onClick={generateQR}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate QR Code"}
      </Button>

      {qrCode && (
        <Card className="p-6 bg-gradient-card border border-primary/20 shadow-card space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-foreground">Generated QR Code</h4>
            <button
              onClick={clearQR}
              className="p-1 hover:bg-primary/10 rounded transition"
              title="Clear"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="flex justify-center bg-white p-4 rounded">
            <img src={qrCode} alt="Generated QR Code" className="max-w-xs" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Encoded Value:</strong> {inputValue}
            </p>
            {productName && (
              <p className="text-sm text-muted-foreground">
                <strong>Product:</strong> {productName}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={downloadQR}
              title="Download as PNG"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={copyToClipboard}
              title="Copy encoded value"
            >
              <Copy className="w-4 h-4 mr-2" />
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
