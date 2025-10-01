import { google } from 'googleapis';

/**
 * Google Calendar Service - Production Ready
 * 
 * Supports multiple authentication methods with automatic fallback:
 * 1. Replit Connector (automatic OAuth via Replit integration)
 * 2. Standard OAuth2 (manual setup with client ID, secret, and refresh token)
 * 3. Service Account (server-to-server authentication)
 * 4. Mock Mode (for development/testing without real credentials)
 * 
 * ENVIRONMENT VARIABLES:
 * 
 * Method 1 - Replit Connector (automatic):
 *   REPLIT_CONNECTORS_HOSTNAME  - Replit connector hostname
 *   REPL_IDENTITY              - Replit identity token
 *   WEB_REPL_RENEWAL          - Deployment renewal token
 * 
 * Method 2 - Standard OAuth2:
 *   GOOGLE_CALENDAR_CLIENT_ID      - OAuth2 client ID from Google Cloud Console
 *   GOOGLE_CALENDAR_CLIENT_SECRET  - OAuth2 client secret
 *   GOOGLE_CALENDAR_REFRESH_TOKEN  - OAuth2 refresh token (obtained via OAuth flow)
 * 
 *   Setup instructions:
 *   1. Go to https://console.cloud.google.com
 *   2. Create project and enable Google Calendar API
 *   3. Create OAuth2 credentials (Desktop app type)
 *   4. Use OAuth Playground to get refresh token: https://developers.google.com/oauthplayground
 *   5. Add these env vars to your deployment
 * 
 * Method 3 - Service Account:
 *   GOOGLE_CALENDAR_SERVICE_ACCOUNT - Full JSON service account key as string
 *   GOOGLE_CALENDAR_EMAIL          - Calendar email to use (optional, defaults to 'primary')
 * 
 *   Setup instructions:
 *   1. Go to https://console.cloud.google.com
 *   2. Create project and enable Google Calendar API
 *   3. Create Service Account and download JSON key
 *   4. Share your Google Calendar with the service account email
 *   5. Set env var: GOOGLE_CALENDAR_SERVICE_ACCOUNT='{"type":"service_account",...}'
 * 
 * Method 4 - Mock Mode (automatic fallback):
 *   No credentials needed - automatically activates if no auth method available
 *   Logs warnings and simulates calendar operations
 */

let connectionSettings: any;
let authMode: 'replit' | 'oauth' | 'service_account' | 'mock' | null = null;
let mockModeWarningShown = false;

const TIMEZONE = 'America/Los_Angeles';
const SLOT_DURATION = 60; // minutes
const BUFFER_TIME = 15; // minutes between appointments

interface BusinessHours {
  [key: number]: { start: string; end: string } | null;
}

const BUSINESS_HOURS: BusinessHours = {
  0: null, // Sunday - closed
  1: { start: '08:00', end: '17:00' }, // Monday
  2: { start: '08:00', end: '17:00' }, // Tuesday
  3: { start: '08:00', end: '17:00' }, // Wednesday
  4: { start: '08:00', end: '17:00' }, // Thursday
  5: { start: '08:00', end: '17:00' }, // Friday
  6: { start: '09:00', end: '14:00' }, // Saturday
};

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceType: string;
  notes?: string;
}

function showMockModeWarning() {
  if (!mockModeWarningShown) {
    console.warn('\n' + '='.repeat(80));
    console.warn('⚠️  GOOGLE CALENDAR MOCK MODE ACTIVE');
    console.warn('='.repeat(80));
    console.warn('No Google Calendar credentials found. Running in MOCK MODE.');
    console.warn('All booking operations will be simulated and logged to console.');
    console.warn('\nTo enable real Google Calendar integration, set one of:');
    console.warn('  • Replit Connector (automatic in Replit environment)');
    console.warn('  • GOOGLE_CALENDAR_CLIENT_ID + CLIENT_SECRET + REFRESH_TOKEN');
    console.warn('  • GOOGLE_CALENDAR_SERVICE_ACCOUNT (JSON string)');
    console.warn('\nSee calendarService.ts comments for detailed setup instructions.');
    console.warn('='.repeat(80) + '\n');
    mockModeWarningShown = true;
  }
}

/**
 * Attempt to get access token from Replit Connector
 */
async function getAccessTokenFromReplitConnector(): Promise<string | null> {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!hostname || !xReplitToken) {
      return null;
    }

    // Check cache first
    if (connectionSettings?.settings?.expires_at) {
      const expiresAt = new Date(connectionSettings.settings.expires_at).getTime();
      if (expiresAt > Date.now()) {
        return connectionSettings.settings.access_token;
      }
    }

    // Fetch fresh token
    const response = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-calendar',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    connectionSettings = data.items?.[0];

    const accessToken = connectionSettings?.settings?.access_token || 
                       connectionSettings?.settings?.oauth?.credentials?.access_token;

    return accessToken || null;
  } catch (error) {
    console.error('Replit connector error (non-fatal):', error);
    return null;
  }
}

/**
 * Create OAuth2 client with standard credentials
 */
function createOAuth2Client(): any | null {
  const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'urn:ietf:wg:oauth:2.0:oob'
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  return oauth2Client;
}

/**
 * Create Service Account client
 */
function createServiceAccountClient(): any | null {
  const serviceAccountJson = process.env.GOOGLE_CALENDAR_SERVICE_ACCOUNT;

  if (!serviceAccountJson) {
    return null;
  }

  try {
    const credentials = JSON.parse(serviceAccountJson);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    return auth;
  } catch (error) {
    console.error('Service account parsing error (non-fatal):', error);
    return null;
  }
}

/**
 * Get Google Calendar client with automatic fallback logic
 */
async function getGoogleCalendarClient(): Promise<any | null> {
  // Try Replit Connector first
  if (!authMode || authMode === 'replit') {
    const accessToken = await getAccessTokenFromReplitConnector();
    if (accessToken) {
      authMode = 'replit';
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accessToken });
      return google.calendar({ version: 'v3', auth: oauth2Client });
    }
  }

  // Try Standard OAuth2
  if (!authMode || authMode === 'oauth') {
    const oauth2Client = createOAuth2Client();
    if (oauth2Client) {
      authMode = 'oauth';
      return google.calendar({ version: 'v3', auth: oauth2Client });
    }
  }

  // Try Service Account
  if (!authMode || authMode === 'service_account') {
    const serviceAccountAuth = createServiceAccountClient();
    if (serviceAccountAuth) {
      authMode = 'service_account';
      return google.calendar({ version: 'v3', auth: serviceAccountAuth });
    }
  }

  // Fall back to mock mode
  authMode = 'mock';
  showMockModeWarning();
  return null;
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return { hours, minutes };
}

function createDateTime(dateStr: string, timeStr: string): Date {
  const date = new Date(dateStr);
  const { hours, minutes } = parseTime(timeStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function generateTimeSlots(date: Date): TimeSlot[] {
  const dayOfWeek = date.getDay();
  const businessHours = BUSINESS_HOURS[dayOfWeek];

  if (!businessHours) {
    return []; // Closed on this day
  }

  const slots: TimeSlot[] = [];
  const { hours: startHour, minutes: startMin } = parseTime(businessHours.start);
  const { hours: endHour, minutes: endMin } = parseTime(businessHours.end);

  let currentHour = startHour;
  let currentMin = startMin;

  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const startTime = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;
    
    let endSlotMin = currentMin + SLOT_DURATION;
    let endSlotHour = currentHour;
    
    if (endSlotMin >= 60) {
      endSlotHour += Math.floor(endSlotMin / 60);
      endSlotMin = endSlotMin % 60;
    }

    const endTime = `${String(endSlotHour).padStart(2, '0')}:${String(endSlotMin).padStart(2, '0')}`;

    if (endSlotHour < endHour || (endSlotHour === endHour && endSlotMin <= endMin)) {
      slots.push({
        startTime,
        endTime,
        available: true,
      });
    }

    currentMin += SLOT_DURATION + BUFFER_TIME;
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60);
      currentMin = currentMin % 60;
    }
  }

  return slots;
}

/**
 * Get available time slots for a given date
 * Returns mock data if no credentials are available
 */
export async function getAvailableSlots(dateStr: string): Promise<TimeSlot[]> {
  try {
    const calendar = await getGoogleCalendarClient();
    const date = new Date(dateStr);
    
    const allSlots = generateTimeSlots(date);

    if (allSlots.length === 0) {
      return [];
    }

    // MOCK MODE: Return all slots as available
    if (!calendar) {
      console.log(`[MOCK] Generating available slots for ${dateStr}`);
      console.log(`[MOCK] Found ${allSlots.length} available time slots`);
      return allSlots;
    }

    // REAL MODE: Check against actual calendar
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const calendarId = process.env.GOOGLE_CALENDAR_EMAIL || 'primary';

    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        timeZone: TIMEZONE,
        items: [{ id: calendarId }],
      },
    });

    const busySlots = freeBusyResponse.data.calendars?.[calendarId]?.busy || 
                     freeBusyResponse.data.calendars?.primary?.busy || 
                     [];

    const availableSlots = allSlots.map(slot => {
      const slotStart = createDateTime(dateStr, slot.startTime);
      const slotEnd = createDateTime(dateStr, slot.endTime);

      const isAvailable = !busySlots.some(busy => {
        const busyStart = new Date(busy.start!);
        const busyEnd = new Date(busy.end!);

        return (
          (slotStart >= busyStart && slotStart < busyEnd) ||
          (slotEnd > busyStart && slotEnd <= busyEnd) ||
          (slotStart <= busyStart && slotEnd >= busyEnd)
        );
      });

      return {
        ...slot,
        available: isAvailable,
      };
    });

    return availableSlots;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    
    // Graceful degradation: return all slots as available
    const date = new Date(dateStr);
    const fallbackSlots = generateTimeSlots(date);
    console.warn(`[FALLBACK] Returning ${fallbackSlots.length} slots due to calendar error`);
    return fallbackSlots;
  }
}

/**
 * Create an appointment
 * Logs to console if no credentials are available (mock mode)
 */
export async function createAppointment(appointmentData: AppointmentData): Promise<any> {
  try {
    const calendar = await getGoogleCalendarClient();
    
    const startDateTime = createDateTime(appointmentData.date, appointmentData.time);
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + SLOT_DURATION);

    const event = {
      summary: `${appointmentData.serviceType} - ${appointmentData.name}`,
      description: `
Service Type: ${appointmentData.serviceType}
Customer: ${appointmentData.name}
Email: ${appointmentData.email}
Phone: ${appointmentData.phone}
${appointmentData.notes ? `\nNotes: ${appointmentData.notes}` : ''}
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: TIMEZONE,
      },
      attendees: [
        { email: appointmentData.email, displayName: appointmentData.name },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    };

    // MOCK MODE: Log appointment instead of creating it
    if (!calendar) {
      console.log('\n' + '='.repeat(80));
      console.log('📅 [MOCK] APPOINTMENT BOOKED (not saved to real calendar)');
      console.log('='.repeat(80));
      console.log('Service:', appointmentData.serviceType);
      console.log('Customer:', appointmentData.name);
      console.log('Email:', appointmentData.email);
      console.log('Phone:', appointmentData.phone);
      console.log('Date:', appointmentData.date);
      console.log('Time:', appointmentData.time);
      console.log('Start:', startDateTime.toISOString());
      console.log('End:', endDateTime.toISOString());
      if (appointmentData.notes) {
        console.log('Notes:', appointmentData.notes);
      }
      console.log('='.repeat(80) + '\n');

      // Return mock response
      return {
        eventId: `mock-${Date.now()}`,
        htmlLink: '#mock-calendar-link',
        hangoutLink: null,
        icsLink: null,
        mockMode: true,
      };
    }

    // REAL MODE: Create actual calendar event
    const calendarId = process.env.GOOGLE_CALENDAR_EMAIL || 'primary';

    // Add conference data only for OAuth methods (not service accounts)
    const requestBody = authMode !== 'service_account' ? {
      ...event,
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}-${appointmentData.email}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    } : event;

    const response = await calendar.events.insert({
      calendarId,
      requestBody,
      conferenceDataVersion: authMode !== 'service_account' ? 1 : undefined,
      sendUpdates: 'all',
    });

    console.log(`✅ [${authMode.toUpperCase()}] Appointment created:`, response.data.id);

    return {
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
      hangoutLink: response.data.hangoutLink,
      icsLink: response.data.htmlLink?.replace('event?eid=', 'event/download?eid='),
      mockMode: false,
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    
    // In mock mode or if error occurs, don't throw - log instead
    if (authMode === 'mock') {
      console.error('[MOCK] Appointment logging failed:', error);
      return {
        eventId: `mock-error-${Date.now()}`,
        htmlLink: '#mock-error',
        hangoutLink: null,
        icsLink: null,
        mockMode: true,
        error: 'Mock mode appointment logging failed',
      };
    }
    
    throw new Error('Failed to create appointment');
  }
}

/**
 * Get current authentication mode for debugging/monitoring
 */
export function getAuthMode(): string {
  return authMode || 'not initialized';
}
