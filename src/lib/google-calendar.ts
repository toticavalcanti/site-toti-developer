import { google } from 'googleapis';

// OAuth2 credentials from environment
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

function getOAuth2Client() {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        throw new Error('Google OAuth credentials not configured');
    }

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        'https://developers.google.com/oauthplayground' // Redirect URL used to get refresh token
    );

    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN,
    });

    return oauth2Client;
}

function getCalendarClient() {
    const auth = getOAuth2Client();
    return google.calendar({ version: 'v3', auth });
}

export interface CalendarSlot {
    start: string; // ISO 8601
    end: string;   // ISO 8601
    available: boolean;
}

/**
 * Get available time slots for a specific date
 * Returns slots between 9 AM and 6 PM, 1-hour duration each
 */
export async function getAvailableSlots(date: Date): Promise<CalendarSlot[]> {
    try {
        const calendar = getCalendarClient();

        if (!CALENDAR_ID) {
            throw new Error('GOOGLE_CALENDAR_ID not configured');
        }

        // Set time range: 9 AM to 6 PM on the given date
        const startOfDay = new Date(date);
        startOfDay.setHours(9, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(18, 0, 0, 0);

        // Fetch busy times from Google Calendar
        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: startOfDay.toISOString(),
                timeMax: endOfDay.toISOString(),
                items: [{ id: CALENDAR_ID }],
            },
        });

        const busySlots = response.data.calendars?.[CALENDAR_ID]?.busy || [];

        // Generate 1-hour slots from 9 AM to 6 PM
        const slots: CalendarSlot[] = [];
        for (let hour = 9; hour < 18; hour++) {
            const slotStart = new Date(date);
            slotStart.setHours(hour, 0, 0, 0);

            const slotEnd = new Date(date);
            slotEnd.setHours(hour + 1, 0, 0, 0);

            // Check if slot overlaps with busy times
            const isBusy = busySlots.some((busy) => {
                const busyStart = new Date(busy.start!);
                const busyEnd = new Date(busy.end!);
                return slotStart < busyEnd && slotEnd > busyStart;
            });

            slots.push({
                start: slotStart.toISOString(),
                end: slotEnd.toISOString(),
                available: !isBusy,
            });
        }

        return slots.filter(slot => slot.available);
    } catch (error) {
        console.error('[Google Calendar] Error fetching slots:', error);
        throw error;
    }
}

export interface CreateEventOptions {
    summary: string;
    description?: string;
    start: string; // ISO 8601
    end: string;   // ISO 8601
    attendeeEmail?: string;
}

/**
 * Create calendar event
 */
export async function createCalendarEvent(
    options: CreateEventOptions
): Promise<string> {
    try {
        const calendar = getCalendarClient();

        if (!CALENDAR_ID) {
            throw new Error('GOOGLE_CALENDAR_ID not configured');
        }

        const event = {
            summary: options.summary,
            description: options.description || '',
            start: {
                dateTime: options.start,
                timeZone: 'America/Sao_Paulo',
            },
            end: {
                dateTime: options.end,
                timeZone: 'America/Sao_Paulo',
            },
            attendees: options.attendeeEmail
                ? [{ email: options.attendeeEmail }]
                : [],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 day before
                    { method: 'popup', minutes: 30 },      // 30 min before
                ],
            },
        };

        const response = await calendar.events.insert({
            calendarId: CALENDAR_ID,
            requestBody: event,
            sendUpdates: 'all', // Send email notifications
        });

        const eventId = response.data.id;
        const eventLink = response.data.htmlLink;

        console.log('[Google Calendar] Event created:', {
            eventId,
            eventLink,
        });

        return eventLink || eventId || '';
    } catch (error) {
        console.error('[Google Calendar] Error creating event:', error);
        throw error;
    }
}
