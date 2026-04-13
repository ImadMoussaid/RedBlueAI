export async function GET() {
  return Response.json({
    status: 'ok',
    service: 'redblueai-web',
    timestamp: new Date().toISOString()
  });
}
