import { redirect } from 'next/navigation';

export default async function ProjetosRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Redirect old project pages to the new central cases page with hash for auto-scroll
  redirect(`/cases#${id}`);
}
