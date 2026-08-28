import { Folder } from "@/generated/prisma/client";
import jsPDF from "jspdf";

export const drawSmallFolderLabel = (
  doc: jsPDF,
  folder: Folder,
  x: number,
  y: number,
) => {
  const width = 30;
  const height = 155;
  const centerX = x + width / 2;

  // Lines
  const line1 = 20;
  const line2 = 40;
  const line3 = 60;
  doc.line(x + 2, y + line1, x + width - 2, y + line1);
  doc.line(x + 2, y + line2, x + width - 2, y + line2);
  doc.line(x + 2, y + line3, x + width - 2, y + line3);

  // Date
  doc.setFontSize(24);
  doc.text(`${folder.year}`, centerX, y + 70, { align: "center" });
  // Period
  let period = "";
  if (folder.monthFrom && folder.monthTo) {
    period = `${folder.monthFrom}-${folder.monthTo}`;
  } else if (folder.monthFrom) {
    period = `od ${folder.monthFrom}`;
  } else if (folder.monthTo) {
    period = `do ${folder.monthTo}`;
  }

  if (period) {
    doc.text(period, centerX, y + 80, {
      align: "center",
    });
  }

  // QR
  if (folder.qrCodeImage) {
    doc.addImage(folder.qrCodeImage, "PNG", x, y + 85, 30, 30);
  }

  // Logo
  doc.addImage("/logo-png.png", "PNG", x, y + 135, 30, 20);

  doc.rect(x, y, width, height);
};
