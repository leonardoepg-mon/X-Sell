const brand = {
  background: "#3f2b54",
  primary: "#00a6d6",
  accent: "#45e0c1",
  text: "#172033",
  muted: "#655576",
  surface: "#ffffff",
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(date);
}

function emailLayout({ preview, title, content, action }) {
  const actionHtml = action
    ? `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0 8px"><tr><td style="border-radius:8px;background:${brand.primary}"><a href="${escapeHtml(action.url)}" style="display:inline-block;padding:13px 22px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700">${escapeHtml(action.label)}</a></td></tr></table>`
    : "";

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:${brand.text}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6">
    <tr><td align="center" style="padding:28px 12px">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:${brand.surface};border-radius:14px;overflow:hidden;box-shadow:0 6px 18px rgba(24,24,27,.12)">
        <tr><td style="padding:24px 30px;background:${brand.background};border-bottom:4px solid ${brand.accent}">
          <div style="font-size:25px;line-height:1.2;font-weight:800;color:#ffffff">X-Sell</div>
          <div style="margin-top:5px;font-size:13px;color:#cbd5e1">Fractals Ventures</div>
        </td></tr>
        <tr><td style="padding:32px 30px">
          <h1 style="margin:0 0 20px;font-size:25px;line-height:1.3;color:${brand.background}">${escapeHtml(title)}</h1>
          ${content}
          ${actionHtml}
        </td></tr>
        <tr><td style="padding:20px 30px;background:#f8fafc;border-top:1px solid #e5e7eb;color:${brand.muted};font-size:12px;line-height:1.6">
          Esta é uma mensagem automática do X-Sell. Por favor, não responda a este e-mail.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function accountConfirmationTemplate({ name, username }) {
  const safeName = escapeHtml(name || username || "Cliente");
  const safeUsername = escapeHtml(username || "");

  const content = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.65">Olá, <strong>${safeName}</strong>!</p>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.65">Sua conta no X-Sell foi criada com sucesso. Agora você pode enviar seus arquivos e acompanhar cada etapa do processamento em um só lugar.</p>
    ${safeUsername ? `<div style="margin:24px 0;padding:16px 18px;background:#f0f9ff;border-left:4px solid ${brand.primary};border-radius:6px"><div style="font-size:12px;color:${brand.muted};text-transform:uppercase;letter-spacing:.5px">Usuário</div><div style="margin-top:5px;font-size:17px;font-weight:700">${safeUsername}</div></div>` : ""}
    <p style="margin:16px 0 0;font-size:15px;line-height:1.65;color:${brand.muted}">Por segurança, sua senha não é exibida neste e-mail.</p>`;

  return {
    subject: "Sua conta X-Sell foi criada",
    text: `Olá, ${name || username || "Cliente"}! Sua conta no X-Sell foi criada com sucesso.${username ? ` Usuário: ${username}.` : ""} Por segurança, sua senha não é exibida neste e-mail.`,
    html: emailLayout({
      preview: "Sua conta X-Sell foi criada com sucesso.",
      title: "Conta criada com sucesso",
      content,
    }),
  };
}

export function processCompletedTemplate({
  name,
  protocol,
  inputName,
  completedAt,
  appUrl,
}) {
  const safeName = escapeHtml(name || "Cliente");
  const safeProtocol = escapeHtml(protocol);
  const safeInputName = escapeHtml(inputName || "Arquivo enviado");
  const safeDate = escapeHtml(formatDate(completedAt));

  const content = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.65">Olá, <strong>${safeName}</strong>!</p>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.65">O processamento da sua solicitação foi concluído. O resultado já está disponível no X-Sell.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px">
      <tr><td style="padding:13px 16px;color:${brand.muted};font-size:13px">Protocolo</td><td align="right" style="padding:13px 16px;font-size:15px;font-weight:700">#${safeProtocol}</td></tr>
      <tr><td style="padding:13px 16px;border-top:1px solid #e5e7eb;color:${brand.muted};font-size:13px">Arquivo enviado</td><td align="right" style="padding:13px 16px;border-top:1px solid #e5e7eb;font-size:14px">${safeInputName}</td></tr>
      ${safeDate ? `<tr><td style="padding:13px 16px;border-top:1px solid #e5e7eb;color:${brand.muted};font-size:13px">Concluído em</td><td align="right" style="padding:13px 16px;border-top:1px solid #e5e7eb;font-size:14px">${safeDate}</td></tr>` : ""}
    </table>
    <p style="margin:0;font-size:15px;line-height:1.65;color:${brand.muted}">Acesse a área de solicitações para baixar o arquivo processado e avaliar o atendimento.</p>`;

  return {
    subject: `Processo #${protocol} concluído — X-Sell`,
    text: `Olá, ${name || "Cliente"}! O processo #${protocol} foi concluído. Arquivo enviado: ${inputName || "não informado"}.${completedAt ? ` Concluído em ${formatDate(completedAt)}.` : ""}${appUrl ? ` Acesse: ${appUrl}` : ""}`,
    html: emailLayout({
      preview: `O processo #${protocol} foi concluído.`,
      title: "Seu processo foi concluído",
      content,
      action: appUrl
        ? {
            label: "Acessar minhas solicitações",
            url: appUrl,
          }
        : undefined,
    }),
  };
}

export function newInputsTemplate({ processIds }) {
  const normalizedIds = [...new Set(processIds.map(String))];
  const processList = normalizedIds
    .map(
      (processId) =>
        `<li style="margin:0 0 8px;font-size:16px;line-height:1.5">Processo <strong>#${escapeHtml(processId)}</strong></li>`,
    )
    .join("");
  const processLabel = normalizedIds.length === 1 ? "processo" : "processos";

  const content = `
    <p style="margin:0 0 18px;font-size:16px;line-height:1.65">Há novos arquivos de entrada aguardando análise no X-Sell.</p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:${brand.muted}">Novos ${processLabel}:</p>
    <ul style="margin:0;padding:18px 18px 10px 38px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px">
      ${processList}
    </ul>`;

  return {
    subject: `${normalizedIds.length} novo${normalizedIds.length === 1 ? " processo" : "s processos"} no X-Sell`,
    text: `Há novos arquivos de entrada aguardando análise no X-Sell. Processos: ${normalizedIds.map((id) => `#${id}`).join(", ")}.`,
    html: emailLayout({
      preview: `Há ${normalizedIds.length} novo${normalizedIds.length === 1 ? " processo" : "s processos"} aguardando análise.`,
      title: "Novos envios recebidos",
      content,
    }),
  };
}
