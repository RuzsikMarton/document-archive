import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import "@/lib/fonts/Roboto-Regular-normal";
import "@/lib/fonts/Roboto-Bold-bold";
import { FolderWithOrganization } from "@/types/folder";

const months = [
  "Január",
  "Február",
  "Marec",
  "Apríl",
  "Máj",
  "Jún",
  "Júl",
  "August",
  "September",
  "Október",
  "November",
  "December",
];

export function generateTransferProtocol({
  folder,
  address,
  ico,
  dic,
}: {
  folder: FolderWithOrganization;
  address?: string;
  ico?: string;
  dic?: string;
}) {
  const period =
    folder.monthFrom && folder.monthTo
      ? `${months[folder.monthFrom - 1]} - ${months[folder.monthTo - 1]}`
      : folder.monthFrom
        ? months[folder.monthFrom - 1]
        : folder.monthTo
          ? months[folder.monthTo - 1]
          : `${months[0]} - ${months[11]}`;
  const doc = new jsPDF("portrait", "mm", "a4");

  // ================= HEADER =================

  doc.setLanguage("sk");
  doc.setFont("Roboto", "normal");
  doc.setFontSize(16);

  doc.text("PREBERACÍ A ODOVZDÁVACÍ PROTOKOL", 14, 18);

  doc.setFontSize(12);

  doc.setFontSize(9);
  doc.text(`Protokol č.: ${folder.id}`, 195, 18, {
    align: "right",
  });

  // ================= COMPANY TABLE =================

  autoTable(doc, {
    startY: 25,

    theme: "grid",

    styles: {
      font: "Roboto",
      fillColor: "#085efb",
      fontSize: 8,
      cellPadding: 3,
      lineWidth: 0.2,
      valign: "top",
    },

    head: [["Odovzdávajúci", "QR kód", "Preberajúci"]],

    body: [
      [
        [
          folder.organization?.name,
          folder.organization?.address &&
            `${folder.organization.address}${
              folder.organization.city ? `, ${folder.organization.city}` : ""
            }${
              folder.organization.postalCode
                ? `, ${folder.organization.postalCode}`
                : ""
            }`,
          " ",
          folder.organization?.ico && `IČO: ${folder.organization.ico}`,
          folder.organization?.dic && `DIČ: ${folder.organization.dic}`,
          folder.organization?.dic && `IČDPH: SK${folder.organization.dic}`,
          " ",
          folder.organization?.telephone &&
            `Telefón: ${folder.organization.telephone}`,
          folder.organization?.email && `E-mail: ${folder.organization.email}`,
          folder.organization?.website && `Web: ${folder.organization.website}`,
        ]
          .filter(Boolean)
          .join("\n"),

        "",

        [
          folder.name,
          address ? `${address}` : "_______________________________",
          address ? " " : " _______________________________",
          ico ? `IČO: ${ico}` : "IČO:  ___________________________",
          dic && `DIČ: ${dic}`,
          dic && `IČDPH: SK${dic}`,
        ]
          .filter(Boolean)
          .join("\n"),
      ],
    ],

    columnStyles: {
      0: {
        font: "Roboto",
        cellWidth: 72,
        fillColor: "#FFFFFF",
      },
      1: {
        font: "Roboto",
        cellWidth: 35,
        halign: "center",
        valign: "middle",
        fillColor: "#FFFFFF",
      },
      2: {
        font: "Roboto",
        cellWidth: 75,
        fillColor: "#FFFFFF",
      },
    },

    didDrawCell(data) {
      if (
        data.section === "body" &&
        data.column.index === 1 &&
        folder.qrCodeImage
      ) {
        const size = 22;

        const x = data.cell.x + (data.cell.width - size) / 2;
        const y = data.cell.y + (data.cell.height - size) / 2;

        doc.addImage(folder.qrCodeImage, "PNG", x, y, size, size);
      }
    },
  });

  // ================= FOLDER =================

  // Split contents into lines and handle pagination
  const contentsLines = (folder.contents ?? "-").split("\n");
  const firstPageMaxLines = 20; // First page has metadata
  const continuationPageMaxLines = 40; // Continuation pages have more space

  const firstPageContent = `
Názov:
${folder.name ?? "-"}

Rok:
${folder.year ?? "-"}

Obdobie:
${period}

Obsah:
${contentsLines.slice(0, firstPageMaxLines).join("\n")}${contentsLines.length > firstPageMaxLines ? "\n\n(pokračuje na ďalšej strane...)" : ""}
${contentsLines.length <= firstPageMaxLines ? "\nOdovzdávajúci potvrdzuje, že šanón bol odovzdaný kompletný, bez viditeľného poškodenia a obsahuje všetky evidované dokumenty.\n\nPreberajúci týmto potvrdzuje prevzatie uvedeného šanónu v rozsahu a stave uvedenom v tomto protokole." : ""}
  `;

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,

    theme: "grid",

    styles: { font: "Roboto", fillColor: "#085efb" },
    columnStyles: {
      0: { font: "Roboto", fillColor: "#FFFFFF" },
    },

    head: [["Popis odovzdaného šanónu"]],

    body: [[firstPageContent.trim()]],
  });

  // If contents is longer than firstPageMaxLines, create additional pages
  if (contentsLines.length > firstPageMaxLines) {
    let remainingLines = contentsLines.slice(firstPageMaxLines);

    while (remainingLines.length > 0) {
      const isLastChunk = remainingLines.length <= continuationPageMaxLines;
      const chunk = remainingLines.slice(0, continuationPageMaxLines);
      remainingLines = remainingLines.slice(continuationPageMaxLines);

      // Add new page
      doc.addPage();

      // Add continuation header
      doc.setFontSize(12);
      doc.text("PREBERACÍ A ODOVZDÁVACÍ PROTOKOL (pokračovanie)", 14, 18);
      doc.setFontSize(9);
      doc.text(`Protokol č.: ${folder.id}`, 195, 18, {
        align: "right",
      });

      // Add contents table
      const continuationContent = `Obsah (pokračovanie):
${chunk.join("\n")}${!isLastChunk ? "\n\n(pokračuje na ďalšej strane...)" : ""}
${isLastChunk ? "\nOdovzdávajúci potvrdzuje, že šanón bol odovzdaný kompletný, bez viditeľného poškodenia a obsahuje všetky evidované dokumenty.\n\nPreberajúci týmto potvrdzuje prevzatie uvedeného šanónu v rozsahu a stave uvedenom v tomto protokole." : ""}`;

      autoTable(doc, {
        startY: 25,
        theme: "grid",
        styles: { font: "Roboto", fillColor: "#085efb" },
        columnStyles: {
          0: { font: "Roboto", fillColor: "#FFFFFF" },
        },
        head: [["Popis odovzdaného šanónu"]],
        body: [[continuationContent.trim()]],
      });
    }
  }

  // ================= FOOTER =================

  const footerY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(10);

  doc.text(
    `${folder.organization?.address ? `${folder.organization.address} ` : ""}${folder.organization?.city ? `${folder.organization.city}, ` : ""}${new Date().toLocaleDateString("sk-SK")}`,
    14,
    footerY,
  );

  doc.text("Odovzdávajúci", 50, footerY + 18, {
    align: "center",
  });

  doc.text("Preberajúci", 160, footerY + 18, {
    align: "center",
  });

  doc.line(15, footerY + 30, 85, footerY + 30);
  doc.line(125, footerY + 30, 195, footerY + 30);

  doc.setFontSize(8);

  doc.text("podpis", 50, footerY + 35, {
    align: "center",
  });

  doc.text("podpis", 160, footerY + 35, {
    align: "center",
  });

  doc.setTextColor(120);

  doc.text("Tento dokument bol vygenerovaný systémom Evidio.", 105, 288, {
    align: "center",
  });

  doc.save(`${folder.id}.pdf`);
}
