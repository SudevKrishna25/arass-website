/**
 * ARASS EVENTS — Transactional Email Templates Suite
 * Luxury Dark Design System // 16 Standardized Transactional Templates
 */

export type EmailTemplateType =
  | 'ACCOUNT_CREATED'
  | 'EMAIL_VERIFICATION'
  | 'PASSWORD_RESET'
  | 'REGISTRATION_CONFIRMATION'
  | 'TEAM_INVITATION'
  | 'ROUND_OPEN'
  | 'ROUND_REMINDER'
  | 'SUBMISSION_CONFIRMATION'
  | 'SUBMISSION_LOCKED'
  | 'JUDGING_ASSIGNED'
  | 'SHORTLISTED'
  | 'RESULTS_PUBLISHED'
  | 'CERTIFICATE_ISSUED'
  | 'CERTIFICATE_REVOKED'
  | 'ORGANIZER_ALERT'
  | 'INCIDENT_UPDATE';

export interface EmailTemplateData {
  recipientName?: string;
  eventName?: string;
  actionUrl?: string;
  teamName?: string;
  roundName?: string;
  position?: string;
  certificateId?: string;
  incidentTitle?: string;
  resetLink?: string;
  verifyLink?: string;
  customMessage?: string;
  [key: string]: any;
}

export function renderEmailTemplate(type: EmailTemplateType, data: EmailTemplateData): { subject: string; html: string; text: string } {
  const brandHeader = `
    <div style="background-color: #01050d; padding: 24px; text-align: center; border-bottom: 1px solid #1e293b;">
      <h1 style="color: #00d4ff; font-family: 'Space Grotesk', -apple-system, sans-serif; font-size: 20px; font-weight: 900; letter-spacing: 2px; margin: 0;">ARASS EVENTS</h1>
      <p style="color: #94a3b8; font-size: 11px; font-family: monospace; margin: 4px 0 0 0; letter-spacing: 1px;">SOVEREIGN INSTITUTIONAL COMPETITION PLATFORM</p>
    </div>
  `;

  const brandFooter = `
    <div style="background-color: #020b18; padding: 20px; text-align: center; border-top: 1px solid #1e293b; color: #64748b; font-size: 11px; font-family: monospace;">
      <p style="margin: 0;">© 2026 ARASS Research & Technology. All rights reserved.</p>
      <p style="margin: 4px 0 0 0;">Cryptographically sealed & verified institutional event notification.</p>
    </div>
  `;

  const wrapContent = (title: string, bodyContent: string, actionText?: string, actionUrl?: string) => {
    const actionBtn = actionUrl ? `
      <div style="text-align: center; margin: 28px 0;">
        <a href="${actionUrl}" style="background-color: #00d4ff; color: #01050d; padding: 12px 28px; border-radius: 9999px; font-family: monospace; font-size: 12px; font-weight: bold; text-decoration: none; display: inline-block; letter-spacing: 1px;">${actionText || 'OPEN COMMAND CENTER →'}</a>
      </div>
    ` : '';

    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>${title}</title></head>
      <body style="background-color: #000208; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #030d1d; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden;">
          ${brandHeader}
          <div style="padding: 32px 24px;">
            <h2 style="color: #ffffff; font-size: 18px; font-weight: 700; margin-top: 0;">${title}</h2>
            ${bodyContent}
            ${actionBtn}
          </div>
          ${brandFooter}
        </div>
      </body>
      </html>
    `;
    return html;
  };

  switch (type) {
    case 'ACCOUNT_CREATED':
      return {
        subject: `[ARASS EVENTS] Welcome to ARASS Sovereign Platform`,
        html: wrapContent(
          'Account Successfully Initialized',
          `<p>Greetings ${data.recipientName || 'Builder'},</p>
           <p>Your participant profile on ARASS EVENTS is active. You can now explore live hackathons, join research squads, and compete for institutional honors.</p>`,
          'EXPLORE COMPETITIONS',
          data.actionUrl || 'https://events.arass.technology/events'
        ),
        text: `Welcome to ARASS EVENTS, ${data.recipientName || 'Builder'}. Your account is initialized. Visit: ${data.actionUrl || 'https://events.arass.technology/events'}`,
      };

    case 'EMAIL_VERIFICATION':
      return {
        subject: `[ACTION REQUIRED] Verify Your ARASS Identity`,
        html: wrapContent(
          'Identity Verification Request',
          `<p>Please verify your email address to unlock authenticated competition registration and deliverable transmission.</p>`,
          'VERIFY EMAIL ADDRESS',
          data.verifyLink || data.actionUrl || 'https://events.arass.technology/verify-email'
        ),
        text: `Verify your ARASS EVENTS email address: ${data.verifyLink || data.actionUrl}`,
      };

    case 'PASSWORD_RESET':
      return {
        subject: `[SECURITY] Password Reset Authorization`,
        html: wrapContent(
          'Security Token Issued',
          `<p>We received a password reset request for your ARASS account. This cryptographic authorization link expires in 60 minutes.</p>`,
          'RESET YOUR PASSWORD',
          data.resetLink || data.actionUrl || 'https://events.arass.technology/reset-password'
        ),
        text: `Reset your ARASS password: ${data.resetLink || data.actionUrl}`,
      };

    case 'REGISTRATION_CONFIRMATION':
      return {
        subject: `[CONFIRMED] Registration Verified: ${data.eventName}`,
        html: wrapContent(
          'Registration Confirmed',
          `<p>Your registration for <strong style="color:#00d4ff;">${data.eventName}</strong> has been officially verified and recorded in the event roster.</p>`,
          'ENTER COMPETITION ROOM',
          data.actionUrl
        ),
        text: `Your registration for ${data.eventName} is confirmed. Live stage: ${data.actionUrl}`,
      };

    case 'TEAM_INVITATION':
      return {
        subject: `[INVITATION] Squad Invite: ${data.teamName}`,
        html: wrapContent(
          'Team Squad Invitation',
          `<p>You have been invited to join squad <strong style="color:#00d4ff;">${data.teamName}</strong> for ${data.eventName}.</p>`,
          'ACCEPT INVITATION',
          data.actionUrl
        ),
        text: `You were invited to join team ${data.teamName} for ${data.eventName}. Accept at: ${data.actionUrl}`,
      };

    case 'ROUND_OPEN':
      return {
        subject: `[STAGE LIVE] ${data.roundName} Has Begun`,
        html: wrapContent(
          'Competition Stage Opened',
          `<p>Stage <strong style="color:#00d4ff;">${data.roundName}</strong> for ${data.eventName} is now officially LIVE. Submissions and deliverable transmissions are active.</p>`,
          'VIEW STAGE & TRANSMIT',
          data.actionUrl
        ),
        text: `Stage ${data.roundName} for ${data.eventName} is live. Submit at: ${data.actionUrl}`,
      };

    case 'ROUND_REMINDER':
      return {
        subject: `[URGENT] 2 Hours Remaining: ${data.roundName}`,
        html: wrapContent(
          'Submission Window Closing Soon',
          `<p>The submission window for <strong style="color:#00d4ff;">${data.roundName}</strong> in ${data.eventName} will close in approximately 2 hours. Ensure your repositories and whitepapers are submitted.</p>`,
          'TRANSMIT FINAL DELIVERABLE',
          data.actionUrl
        ),
        text: `2 hours remaining for ${data.roundName} in ${data.eventName}. Submit at: ${data.actionUrl}`,
      };

    case 'SUBMISSION_CONFIRMATION':
      return {
        subject: `[RECEIVED] Deliverable Signed: ${data.eventName}`,
        html: wrapContent(
          'Cryptographic Submission Received',
          `<p>Your project deliverable for <strong style="color:#00d4ff;">${data.eventName}</strong> was received and indexed into the jury review queue.</p>`,
          'VIEW DELIVERABLE STATUS',
          data.actionUrl
        ),
        text: `Your deliverable for ${data.eventName} was received. Check status: ${data.actionUrl}`,
      };

    case 'SUBMISSION_LOCKED':
      return {
        subject: `[CLOSED] Submission Window Concluded: ${data.eventName}`,
        html: wrapContent(
          'Stage Submissions Locked',
          `<p>The submission deadline has expired. Project artifacts have been cryptographically locked for jury evaluation.</p>`,
          'VIEW COMPETITION ROOM',
          data.actionUrl
        ),
        text: `Submissions locked for ${data.eventName}. View status: ${data.actionUrl}`,
      };

    case 'JUDGING_ASSIGNED':
      return {
        subject: `[JURY] New Submissions Allocated: ${data.eventName}`,
        html: wrapContent(
          'Juror Assignment Notice',
          `<p>New candidate submissions have been allocated to your evaluation workload for <strong style="color:#00d4ff;">${data.eventName}</strong>.</p>`,
          'ENTER JURY SCORING CONSOLE',
          data.actionUrl || 'https://events.arass.technology/judge/dashboard'
        ),
        text: `New submissions allocated for ${data.eventName}. Score at: ${data.actionUrl}`,
      };

    case 'SHORTLISTED':
      return {
        subject: `[ADVANCEMENT] Qualified for Grand Finale: ${data.eventName}`,
        html: wrapContent(
          'Squad Shortlisted for Next Stage',
          `<p>Congratulations! Your squad has been shortlisted by the Technical Evaluation Board for <strong style="color:#00d4ff;">${data.eventName}</strong>.</p>`,
          'VIEW ADVANCEMENT ROSTER',
          data.actionUrl
        ),
        text: `Congratulations! Shortlisted for ${data.eventName}. Check details: ${data.actionUrl}`,
      };

    case 'RESULTS_PUBLISHED':
      return {
        subject: `[OFFICIAL] Championship Results Published: ${data.eventName}`,
        html: wrapContent(
          'Official Honours & Results',
          `<p>The Grand Jury has concluded all evaluations. The official leaderboard and championship awards for <strong style="color:#00d4ff;">${data.eventName}</strong> are now live.</p>`,
          'VIEW RESULTS SHOWCASE',
          data.actionUrl
        ),
        text: `Championship results for ${data.eventName} are live: ${data.actionUrl}`,
      };

    case 'CERTIFICATE_ISSUED':
      return {
        subject: `[HONOUR] Official Credential Generated: ${data.certificateId}`,
        html: wrapContent(
          'Certificate of Honor Issued',
          `<p>An official cryptographically verified certificate (<strong style="color:#00d4ff;">${data.certificateId}</strong>) has been generated for ${data.recipientName} (${data.position || 'Participant'}).</p>`,
          'VERIFY & DOWNLOAD CREDENTIAL',
          data.actionUrl
        ),
        text: `Your verified certificate ${data.certificateId} is available: ${data.actionUrl}`,
      };

    case 'CERTIFICATE_REVOKED':
      return {
        subject: `[REVOCATION] Certificate Status Update: ${data.certificateId}`,
        html: wrapContent(
          'Credential Revoked',
          `<p>Certificate <strong style="color:#f87171;">${data.certificateId}</strong> has been revoked by the system administrator.</p>
           <p>Reason: <em>${data.customMessage || 'Administrative audit correction'}</em></p>`,
          'VIEW PUBLIC AUDIT RECORD',
          data.actionUrl
        ),
        text: `Certificate ${data.certificateId} was revoked. Reason: ${data.customMessage}. Audit: ${data.actionUrl}`,
      };

    case 'ORGANIZER_ALERT':
      return {
        subject: `[ALERT] Organizer System Notice: ${data.eventName || 'Platform'}`,
        html: wrapContent(
          'Critical Operator Alert',
          `<p>${data.customMessage || 'An operational event requires your immediate attention in the Organizer Command Center.'}</p>`,
          'OPEN OPERATOR CONSOLE',
          data.actionUrl || 'https://events.arass.technology/organizer/dashboard'
        ),
        text: `Organizer Alert: ${data.customMessage}`,
      };

    case 'INCIDENT_UPDATE':
      return {
        subject: `[SUPPORT] Incident Update: ${data.incidentTitle || 'Help Desk Ticket'}`,
        html: wrapContent(
          'Operational Incident Status',
          `<p>An update has been logged regarding incident ticket: <strong>${data.incidentTitle}</strong>.</p>
           <p style="background-color: #01050d; padding: 12px; border-left: 3px solid #00d4ff; font-size: 13px;">${data.customMessage || 'The issue is being investigated by operations.'}</p>`,
          'VIEW INCIDENT LEDGER',
          data.actionUrl
        ),
        text: `Incident Update: ${data.incidentTitle}. Message: ${data.customMessage}`,
      };
  }
}
