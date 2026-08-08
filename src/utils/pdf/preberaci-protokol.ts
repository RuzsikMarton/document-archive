import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import "@/lib/fonts/Roboto-Regular-normal";
import { FolderWithCompany } from "@/types/folder";

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
}: {
  folder: FolderWithCompany;
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
  doc.setFont("Roboto-Regular");
  doc.setFontSize(16);

  doc.text("PREBERACÍ A ODOVZDÁVACÍ PROTOKOL", 14, 18);

  doc.setFontSize(12);

  doc.text(folder.id, 195, 18, {
    align: "right",
  });

  // ================= COMPANY TABLE =================

  autoTable(doc, {
    startY: 25,

    theme: "grid",

    styles: {
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
          folder.company?.name,
          folder.company?.address,
          " ",
          folder.company?.ico && `ICO: ${folder.company.ico}`,
          folder.company?.dic && `DIC: ${folder.company.dic}`,
          folder.company?.dic && `ICDPH: SK${folder.company.dic}`,
          " ",
          folder.company?.telephone && `Telefón: ${folder.company.telephone}`,
          folder.company?.email && `E-mail: ${folder.company.email}`,
          folder.company?.website && `Web: ${folder.company.website}`,
        ]
          .filter(Boolean)
          .join("\n"),

        "",

        [
          folder.name,
          " ",
          " _______________________________",
          " _______________________________",
          " ",
          "ICO:  ___________________________",
          "DIC:  ___________________________",
          "ICDPH: ___________________________",
        ]
          .filter(Boolean)
          .join("\n"),
      ],
    ],

    columnStyles: {
      0: {
        cellWidth: 72,
        fillColor: "#FFFFFF",
      },
      1: {
        cellWidth: 35,
        halign: "center",
        valign: "middle",
        fillColor: "#FFFFFF",
      },
      2: {
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
        const y = data.cell.y + 4;

        doc.addImage(folder.qrCodeImage, "PNG", x, y, size, size);
      }
    },
  });

  // ================= FOLDER =================

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,

    theme: "grid",

    styles: { fillColor: "#085efb" },
    columnStyles: { 0: { fillColor: "#FFFFFF" } },

    head: [["Popis odovzdaného šanónu"]],

    body: [
      [
        `
Názov:
${folder.name ?? "-"}

Rok:
${folder.year ?? "-"}

Obdobie:
${period ?? "-"}

Obsah:
${folder.contents ?? "-"}

Odovzdávajúci potvrdzuje, že šanón bol odovzdaný kompletný, bez viditelného poškodenia a obsahuje všetky evidované dokumenty.

Preberajúci potvrdzuje prevzatie uvedeného šanónu.
        `,
      ],
    ],
  });

  // ================= FOOTER =================

  const footerY = (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(10);

  doc.text(
    `${folder.company?.address}, ${new Date().toLocaleDateString("sk-SK")}`,
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
