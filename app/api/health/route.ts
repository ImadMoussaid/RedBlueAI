export async function GET() {
  return Response.json({
    status: 'ok',
    service: 'purple-rain-web',
    timestamp: new Date().toISOString()
  });
}
