import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

function readData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    // Check auth cookie
    const authCookie = request.cookies.get('admin_auth');
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const current = readData();
    const updated = { ...current, ...body };
    writeData(updated);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
