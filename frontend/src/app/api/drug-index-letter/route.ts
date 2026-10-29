import { fetchDrugIndexLetter } from "@/lib/wordpress";

export async function GET(req: Request) {
  const letter = new URL(req.url).searchParams.get("letter") ?? "";
  if (!/^[A-Za-z]$/.test(letter)) {
    return Response.json({ success: false, items: [] }, { status: 400 });
  }

  const items = await fetchDrugIndexLetter(letter);
  if (items === null) {
    return Response.json({ success: false, items: [] }, { status: 502 });
  }
  return Response.json({ success: true, items });
}
