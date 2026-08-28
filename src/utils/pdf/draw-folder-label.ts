import { Folder } from "@/generated/prisma/client";
import jsPDF from "jspdf";

export const drawFolderLabel = (
  doc: jsPDF,
  folder: Folder,
  x: number,
  y: number,
) => {
  const width = 50;
  const height = 155;
  const centerX = x + width / 2;

  // Name
  doc.setFontSize(20);
  const lines = doc.splitTextToSize(folder.name, width - 5);
  doc.text(lines, centerX, y + 20, {
    align: "center",
  });

  // Year
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
    doc.addImage(folder.qrCodeImage, "PNG", x, y + 85, 50, 50);
  }

  // ID
  doc.setFontSize(8);
  doc.text(folder.id, centerX, y + 135, { align: "center" });

  // Logo
  doc.addImage("/logo-png.png", "PNG", x + 2.5, y + 135, 45, 30);

  // Border
  doc.rect(x, y, width, height);
};
