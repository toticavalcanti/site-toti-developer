import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 21600; // 6 horas

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const handle = searchParams.get('handle'); // ex: @codigofluente
  
  if (!handle) {
    return NextResponse.json({ error: 'Handle required' }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    // Fallback sem API key
    return NextResponse.json({
      channelTitle: handle.replace('@', ''),
      thumbnail: '/placeholder-channel.jpg',
      subscriberCount: null,
      videoCount: null,
    });
  }

  try {
    // 1. Buscar channel ID pelo handle
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${handle}&key=${apiKey}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.items?.length) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    const channelId = searchData.items[0].snippet.channelId;

    // 2. Buscar stats do canal
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    const channelRes = await fetch(channelUrl);
    const channelData = await channelRes.json();

    const channel = channelData.items[0];

    return NextResponse.json({
      channelId: channel.id,
      channelTitle: channel.snippet.title,
      description: channel.snippet.description,
      thumbnail: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default.url,
      subscriberCount: channel.statistics.subscriberCount,
      videoCount: channel.statistics.videoCount,
      viewCount: channel.statistics.viewCount,
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }
}
