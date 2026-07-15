import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { slug?: string; secret?: string };
    if (body.secret !== process.env.REVALIDATE_SECRET) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }
    if (body.slug) {
      await revalidatePath(`/${body.slug}`);
    } else {
      await revalidatePath("/", "layout");
    }
    return Response.json({ revalidated: true });
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
}
