import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 21600; // 6 horas

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoId = searchParams.get('id');

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      title: 'Vídeo',
      viewCount: null,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items?.length) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const video = data.items[0];

    return NextResponse.json({
      videoId: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }
}
