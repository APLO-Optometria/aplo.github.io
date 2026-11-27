// Desenho do certificado em PDF (jsPDF). Página 320×180 mm (16:9) = proporção do fundo.
// A zona de texto fica à direita da marca "visão de futuro"; o símbolo central do fundo
// (≈ x 203–237, y 71–108 mm) funciona como selo entre o nome e o texto.
(function () {
  const W = 320, H = 180;
  const CX = 215, COL = 170; // centro e largura da coluna de texto
  const BRANCO = [255, 255, 255], LARANJA = [247, 144, 73], ROSA = [240, 115, 192];

  function criar(nome, cfco, img, opts) {
    const C = window.CAO;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: [W, H], compress: true });
    doc.setProperties({
      title: `Certificado de Participação — ${C.edicao} ${C.evento}`,
      subject: `${C.edicao} ${C.evento}`,
      author: "APLO — Associação de Profissionais Licenciados de Optometria",
    });

    // Fundo
    doc.addImage(img, "JPEG", 0, 0, W, H, undefined, "FAST");

    const centro = (txt, y) => doc.text(txt, CX, y, { align: "center" });
    doc.setTextColor(...BRANCO);

    // Título
    doc.setFont("helvetica", "bold").setFontSize(21);
    doc.text("CERTIFICADO DE PARTICIPAÇÃO", CX, 26, { align: "center", charSpace: 0.5 });
    doc.setDrawColor(...LARANJA).setLineWidth(0.9).line(CX - 12, 31, CX + 12, 31);

    // Entidade
    doc.setFont("helvetica", "normal").setFontSize(11.5);
    const ent = doc.splitTextToSize(C.entidade, COL);
    doc.text(ent, CX, 41, { align: "center", lineHeightFactor: 1.4 });

    // Nome (reduz o tamanho até caber numa linha; só depois quebra)
    doc.setFont("times", "italic");
    let tam = 30;
    doc.setFontSize(tam);
    while (doc.getTextWidth(nome) > COL && tam > 18) doc.setFontSize((tam -= 1));
    const linhas = doc.splitTextToSize(nome, COL);
    doc.text(linhas, CX, linhas.length > 1 ? 58 : 62, { align: "center", lineHeightFactor: 1.1 });
    const yLinha = linhas.length > 1 ? 68 : 67;
    doc.setDrawColor(...ROSA).setLineWidth(0.5).line(CX - 70, yLinha, CX + 70, yLinha);

    // (selo do fundo: y 71–108)

    // Texto principal
    doc.setFont("helvetica", "normal").setFontSize(11.5);
    const corpo =
      `participou nas ${C.edicao} ${C.evento}, realizadas nos dias ${C.datasExtenso}, ` +
      `no ${C.local}, totalizando`;
    doc.text(doc.splitTextToSize(corpo, COL), CX, 118, { align: "center", lineHeightFactor: 1.4 });

    // Destaque CFCO
    doc.setFont("helvetica", "bold").setFontSize(21).setTextColor(...LARANJA);
    centro(`${cfco} CFCO`, 134);
    doc.setFont("helvetica", "normal").setFontSize(10.5).setTextColor(...BRANCO);
    centro("Créditos de Formação Contínua em Optometria", 140);

    // Fecho
    doc.setFontSize(9.5);
    doc.text(doc.splitTextToSize(C.fecho, COL - 10), CX, 148, { align: "center", lineHeightFactor: 1.4 });

    // Assinaturas
    const n = C.assinaturas.length;
    C.assinaturas.forEach((a, i) => {
      const x = CX + (i - (n - 1) / 2) * 80;
      if (a.img) {
        const h = 14, w = (h * a.img.naturalWidth) / a.img.naturalHeight;
        doc.addImage(a.img, "PNG", x - w / 2, 152.5, w, h, undefined, "FAST");
      }
      doc.setDrawColor(...BRANCO).setLineWidth(0.3).line(x - 30, 167, x + 30, 167);
      doc.setFont("helvetica", "bold").setFontSize(9.5).text(a.nome, x, 171.3, { align: "center" });
      doc.setFont("helvetica", "normal").setFontSize(8.5).text(a.cargo, x, 175, { align: "center" });
    });

    if (opts && opts.imprimir) doc.autoPrint();
    return doc;
  }

  window.Certificado = { criar, W, H };
})();
