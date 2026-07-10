import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MESSAGES_PATH = path.join(process.cwd(), 'data', 'messages.json');

function readMessages() {
  if (!fs.existsSync(MESSAGES_PATH)) return [];
  const raw = fs.readFileSync(MESSAGES_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeMessages(messages) {
  fs.writeFileSync(MESSAGES_PATH, JSON.stringify(messages, null, 2), 'utf-8');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, mobile, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const messages = readMessages();
    messages.push({
      id: Date.now().toString(),
      name,
      email,
      mobile,
      message,
      createdAt: new Date().toISOString(),
    });
    writeMessages(messages);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function GET(request) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const messages = readMessages();
  return NextResponse.json(messages);
}
