'use client';

import { useParams, useRouter } from 'next/navigation';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();

  router.push(`/projects/${params.projectId}/dashboard`);
}
