import MainPage from '@/components/home/MainPage';
import { BACKEND_URL } from '@/config/keys';
import { IClassType, IResponseData, ISubject, ITuitionm } from '@/types';
import { fetchWithErrorHandling } from '@/utils/fetcher';
import React from 'react';

// Make fetchWithErrorHandling generic to type its response
async function getCachedData(): Promise<IResponseData> {
  try {
    const [classTypesRes, subjectsRes, tuitionmsRes] = await Promise.all([
      fetchWithErrorHandling<{ classTypes: IClassType[] }>(
        `${BACKEND_URL}/api/classtype/all`,
        { next: { revalidate: 3600 } }
      ),
      fetchWithErrorHandling<{ subjects: ISubject[] }>(
        `${BACKEND_URL}/api/subject/all`,
        { next: { revalidate: 3600 } }
      ),
      fetchWithErrorHandling<{ tuitionms: ITuitionm[] }>(
        `${BACKEND_URL}/api/tuitionm/all`,
        { next: { revalidate: 3600 } }
      ),
    ]);
    return {
      classTypes: classTypesRes?.classTypes ?? [],
      subjects: subjectsRes?.subjects ?? [],
      tuitionms: tuitionmsRes?.tuitionms ?? [],
    };
  } catch (error) {
    console.error('Homepage data fetch failed:', error);
    return {
      classTypes: [],
      subjects: [],
      tuitionms: [],
    };
  }
}

async function Page() {
  const data = await getCachedData();

  return <MainPage data={data} />;
}

export default Page;