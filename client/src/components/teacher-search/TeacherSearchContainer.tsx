// app/teacher-search/TeacherSearchContainer.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from '@/config/axios';
// import { SearchParamsInterface, TeachersResponseInterface, TeacherInterface } from '@/types/search';
import { IClassType, ICustomer, ISearchParams, ISubject, ITeachersResponse, ITuitionm } from '@/types';
import SearchFilters from '@/components/search/SearchFilters';
import TeacherCard from '@/components/teacher/TeacherCard';
import SearchIcon from '@/components/icons/SearchIcon';
import ChevronLeft from '@/components/icons/ChevronLeft';
import ChevronRight from '@/components/icons/ChevronRight';

interface TeacherSearchContainerProps {
  initialTeachers: ITeachersResponse;
  initialParams: ISearchParams;
  classTypes: IClassType[];
  subjects: ISubject[];
  tuitionms: ITuitionm[];
  styles: Record<string, string>;
}

export default function TeacherSearchContainer({
  initialTeachers,
  initialParams,
  classTypes,
  subjects,
  tuitionms,
  styles,
}: TeacherSearchContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [teachers, setTeachers] = useState<ICustomer[]>(initialTeachers?.teachers || []);
  const [pagination, setPagination] = useState({
    total: initialTeachers.total,
    page: initialTeachers.page,
    limit: initialTeachers.limit,
    totalPages: initialTeachers.totalPages,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(initialParams.sort || 'rating_desc');

  // Fetch teachers with current filters
  const fetchTeachers = useCallback(async (params: ISearchParams) => {
    setIsLoading(true);
    try {
      const response = await axios.get('/search/teachers', {
        params: {
          location: params.location,
          classTypeId: params.ClassTypeId !== 0 ? params.ClassTypeId : undefined,
          subjectId: params.SubjectId !== 0 ? params.SubjectId : undefined,
          tutionplace: params.tutionplace !== 'ANY' ? params.tutionplace : undefined,
          tuitionmId: params.TuitionmId !== 0 ? params.TuitionmId : undefined,
          page: params.page,
          limit: params.limit,
          sort: params.sort,
        },
      });

      console.log(response.data);
      
      
      setTeachers(response.data.teachers);
      setPagination({
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle search
  const handleSearch = useCallback((params: ISearchParams) => {
    fetchTeachers(params);
  }, [fetchTeachers]);

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/teacher-search?${params.toString()}`, { scroll: false });
    
    fetchTeachers({
      ...initialParams,
      page: newPage,
      sort: sortBy,
    });
  }, [router, searchParams, pagination.totalPages, initialParams, fetchTeachers, sortBy]);

  // Handle sort change
  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.set('page', '1');
    router.push(`/teacher-search?${params.toString()}`, { scroll: false });
    
    fetchTeachers({
      ...initialParams,
      page: 1,
      sort: newSort,
    });
  }, [router, searchParams, initialParams, fetchTeachers]);

  // Sync with URL changes
  useEffect(() => {
    const page = searchParams.get('page');
    const sort = searchParams.get('sort');
    
    if (page || sort) {
      fetchTeachers({
        ...initialParams,
        page: page ? parseInt(page) : 1,
        sort: sort || 'rating_desc',
      });
    }
  }, [searchParams, initialParams, fetchTeachers]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.ambientOrb1} aria-hidden="true" />
      <div className={styles.ambientOrb2} aria-hidden="true" />
      
      <span className={`${styles.bgWord} ${styles.bgWordTeachers}`} aria-hidden="true">teachers</span>
      <span className={`${styles.bgWord} ${styles.bgWordSearch}`} aria-hidden="true">search</span>

      <div className="container-xl px-4 px-lg-5 position-relative" style={{ zIndex: 4 }}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1>
            Find Your <span>Perfect Teacher</span>
          </h1>
          <p>Search through our verified teachers and find the perfect match for your learning journey</p>
        </div>

        {/* Search Filters */}
        <div className={styles.searchSection}>
          <SearchFilters
            s={styles}
            classTypes={classTypes}
            subjects={subjects}
            tuitionms={tuitionms}
            initialParams={initialParams}
            onSearch={handleSearch}
          />
        </div>

        {/* Results Section */}
        <div className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <div className={styles.resultsTitle}>
              <h2>
                {pagination.total > 0 ? `${pagination.total} Teachers Found` : 'No Teachers Found'}
              </h2>
              <p>
                Showing <strong>{(pagination.page - 1) * pagination.limit + 1}</strong> to{' '}
                <strong>{Math.min(pagination.page * pagination.limit, pagination.total)}</strong> of{' '}
                <strong>{pagination.total}</strong> results
              </p>
            </div>
            
            <div className={styles.resultsSort}>
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                aria-label="Sort teachers by"
              >
                <option value="rating_desc">Highest Rated</option>
                <option value="rating_asc">Lowest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="experience_desc">Most Experienced</option>
                <option value="students_desc">Most Students</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>Loading teachers...</p>
            </div>
          ) : teachers.length > 0 ? (
            <>
              <div className={styles.teacherGrid}>
                {teachers.map((teacher, i) => (
                  <TeacherCard key={
                    i
                    // teacher.id
                  } teacher={teacher} s={styles} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    className={`${styles.pageItem} ${pagination.page === 1 ? styles.disabled : ''}`}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft />
                  </button>
                  
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === pagination.totalPages || 
                      Math.abs(page - pagination.page) <= 2
                    )
                    .map((page, index, array) => {
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <span key={`ellipsis-${page}`} className={styles.pageItem} style={{ border: 'none' }}>
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          className={`${styles.pageItem} ${pagination.page === page ? styles.active : ''}`}
                          onClick={() => handlePageChange(page)}
                          aria-label={`Page ${page}`}
                          aria-current={pagination.page === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      );
                    })}
                  
                  <button
                    className={`${styles.pageItem} ${pagination.page === pagination.totalPages ? styles.disabled : ''}`}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <SearchIcon />
              <h3>No Teachers Found</h3>
              <p>Try adjusting your search filters or clear some criteria to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}