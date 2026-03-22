import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY!);
  }
  return _resend;
}

const FROM = "VisitFlorence <hello@visitflorence.co>";
const ADMIN = "CEO@epicai.ai";

export async function sendListingConfirmation(opts: {
  ownerEmail: string;
  businessName: string;
  category: string;
  slug: string;
  plan: string;
}) {
  const resend = getResend();
  const url = `https://visitflorence.co/${opts.category}/${opts.slug}`;

  const [ownerResult, adminResult] = await Promise.allSettled([
    // Confirmation to business owner
    resend.emails.send({
      from: FROM,
      to: opts.ownerEmail,
      subject: `Your listing is live — ${opts.businessName}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#0D1117;color:#F0F6FC;border-radius:12px;">
          <h1 style="font-size:22px;margin:0 0 8px;color:#F0F6FC;">You're on VisitFlorence!</h1>
          <p style="color:#8B949E;margin:0 0 16px;">Your listing for <strong style="color:#D4A853">${opts.businessName}</strong> is now live on the Florence, CO directory.</p>
          <a href="${url}" style="display:inline-block;padding:12px 24px;background:#D4A853;color:#0D1117;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View Your Listing</a>
          <hr style="border-color:#30363D;margin:24px 0;">
          <p style="color:#8B949E;font-size:13px;margin:0;">Plan: <strong style="color:#F0F6FC;">${opts.plan}</strong> · <a href="https://visitflorence.co/pricing" style="color:#D4A853;">Upgrade anytime</a></p>
          <p style="color:#8B949E;font-size:13px;margin:8px 0 0;">Questions? Reply to this email or visit <a href="https://visitflorence.co" style="color:#D4A853;">visitflorence.co</a></p>
        </div>
      `,
    }),

    // Notification to admin
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: `New listing submitted: ${opts.businessName}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#161B22;color:#F0F6FC;border-radius:8px;">
          <h2 style="font-size:18px;margin:0 0 12px;">New Listing Submitted</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:6px 0;color:#8B949E;width:120px;">Business</td><td style="color:#F0F6FC;"><strong>${opts.businessName}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#8B949E;">Category</td><td style="color:#F0F6FC;">${opts.category}</td></tr>
            <tr><td style="padding:6px 0;color:#8B949E;">Plan</td><td style="color:#D4A853;">${opts.plan}</td></tr>
            <tr><td style="padding:6px 0;color:#8B949E;">Owner Email</td><td style="color:#F0F6FC;">${opts.ownerEmail}</td></tr>
            <tr><td style="padding:6px 0;color:#8B949E;">URL</td><td><a href="${url}" style="color:#D4A853;">${url}</a></td></tr>
          </table>
          <div style="margin-top:16px;">
            <a href="https://visitflorence.co/admin/listings" style="display:inline-block;padding:10px 20px;background:#D4A853;color:#0D1117;text-decoration:none;border-radius:6px;font-weight:600;font-size:13px;">View in Admin</a>
          </div>
        </div>
      `,
    }),
  ]);

  if (ownerResult.status === "rejected") {
    console.error(JSON.stringify({ level: "error", msg: "owner email failed", error: String(ownerResult.reason) }));
  }
  if (adminResult.status === "rejected") {
    console.error(JSON.stringify({ level: "error", msg: "admin email failed", error: String(adminResult.reason) }));
  }
}

export async function sendRequestListingNotification(opts: {
  businessName: string;
  submitterName: string;
  submitterEmail: string;
  phone?: string;
  message?: string;
}) {
  const resend = getResend();

  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `Listing request: ${opts.businessName}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#161B22;color:#F0F6FC;border-radius:8px;">
        <h2 style="font-size:18px;margin:0 0 12px;">New Listing Request</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#8B949E;width:120px;">Business</td><td style="color:#F0F6FC;"><strong>${opts.businessName}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#8B949E;">Name</td><td style="color:#F0F6FC;">${opts.submitterName}</td></tr>
          <tr><td style="padding:6px 0;color:#8B949E;">Email</td><td style="color:#F0F6FC;">${opts.submitterEmail}</td></tr>
          ${opts.phone ? `<tr><td style="padding:6px 0;color:#8B949E;">Phone</td><td style="color:#F0F6FC;">${opts.phone}</td></tr>` : ""}
          ${opts.message ? `<tr><td style="padding:6px 0;color:#8B949E;vertical-align:top;">Message</td><td style="color:#F0F6FC;">${opts.message}</td></tr>` : ""}
        </table>
      </div>
    `,
  });
}
