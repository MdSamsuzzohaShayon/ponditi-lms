import { Suspense } from 'react';
import { Metadata } from 'next';
import { BACKEND_URL } from '@/config/keys';
import { IClassType, ISubject, ITuitionm, IResponseData, ISearchParams, ITeachersResponse } from '@/types';
import { ETuitionStyle } from '@/types/enums';
import { fetchWithErrorHandling } from '@/utils/fetcher';
import TeacherSearchContainer from '@/components/teacher-search/TeacherSearchContainer';
import styles from '@/styles/TeacherSearch.module.scss';

export const metadata: Metadata = {
  title: 'Find Your Teacher | Educamb',
  description: 'Search and find the perfect teacher for your learning needs',
};

// Fetch class types, subjects, and tuition mediums with caching
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
    console.error('Teacher search data fetch failed:', error);
    return {
      classTypes: [],
      subjects: [],
      tuitionms: [],
    };
  }
}

// Fetch initial teachers based on search params
async function getInitialTeachers(searchParams: ISearchParams): Promise<ITeachersResponse> {
  const queryParams = new URLSearchParams();
  
  // Only add params that have values
  if (searchParams.location) queryParams.append('location', searchParams.location);
  if (searchParams.ClassTypeId && searchParams.ClassTypeId !== 0) {
    queryParams.append('classTypeId', searchParams.ClassTypeId.toString());
  }
  if (searchParams.SubjectId && searchParams.SubjectId !== 0) {
    queryParams.append('subjectId', searchParams.SubjectId.toString());
  }
  if (searchParams.tutionplace && searchParams.tutionplace !== ETuitionStyle.ANY) {
    queryParams.append('tutionplace', searchParams.tutionplace);
  }
  if (searchParams.TuitionmId && searchParams.TuitionmId !== 0) {
    queryParams.append('tuitionmId', searchParams.TuitionmId.toString());
  }
  
  queryParams.append('page', (searchParams.page || 1).toString());
  queryParams.append('limit', (searchParams.limit || 9).toString());
  queryParams.append('sort', searchParams.sort || 'rating_desc');

  try {
    const response = await fetchWithErrorHandling<ITeachersResponse>(
      `${BACKEND_URL}/api/search/teachers?${queryParams.toString()}`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );
    
    return response || {
      teachers: [],
      total: 0,
      page: 1,
      limit: 9,
      totalPages: 0,
    };
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return {
      teachers: [],
      total: 0,
      page: 1,
      limit: 9,
      totalPages: 0,
    };
  }
}

interface PageProps {
  searchParams: Promise<Partial<ISearchParams>>;
}

export default async function TeacherSearchPage({ searchParams }: PageProps) {
  // Parse search params
  const params = await searchParams;
  
  const initialParams: ISearchParams = {
    location: params.location || '',
    ClassTypeId: params.ClassTypeId ? parseInt(String(params.ClassTypeId)) : 0,
    SubjectId: params.SubjectId ? parseInt(String(params.SubjectId)) : 0,
    tutionplace: (params.tutionplace as ETuitionStyle) || ETuitionStyle.ANY,
    TuitionmId: params.TuitionmId ? parseInt(String(params.TuitionmId)) : 0,
    page: params.page ? parseInt(String(params.page)) : 1,
    limit: 9,
    sort: params.sort || 'rating_desc',
  };

  // Fetch all data in parallel using the same pattern as home page
  const [cachedData, initialTeachers] = await Promise.all([
    getCachedData(),
    getInitialTeachers(initialParams),
  ]);

  return (
    <Suspense fallback={<TeacherSearchLoading />}>
      <TeacherSearchContainer
        initialTeachers={initialTeachers}
        initialParams={initialParams}
        classTypes={cachedData.classTypes}
        subjects={cachedData.subjects}
        tuitionms={cachedData.tuitionms}
        styles={styles}
      />
    </Suspense>
  );
}

// Loading component
function TeacherSearchLoading() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.ambientOrb1} aria-hidden="true" />
      <div className={styles.ambientOrb2} aria-hidden="true" />
      
      <div className="container-xl px-4 px-lg-5 position-relative" style={{ zIndex: 4 }}>
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <p>Loading teachers...</p>
        </div>
      </div>
    </div>
  );
}