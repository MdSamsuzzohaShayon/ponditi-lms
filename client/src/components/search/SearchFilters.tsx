// components/search/SearchFilters.tsx
import { memo, useCallback, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ETuitionStyle } from '@/types/enums';
import LocationAutocomplete from '../ui/LocationAutocomplete';
import SearchIcon from '../icons/SearchIcon';
import { ISearchParams } from '@/types';
import FilterSelect from '../home/FilterSelect';

interface SearchFiltersProps {
  s: Record<string, string>;
  classTypes: Array<{ id: number; name: string }>;
  subjects: Array<{ id: number; name: string }>;
  tuitionms: Array<{ id: number; name: string }>;
  initialParams?: Partial<ISearchParams>;
  onSearch: (params: ISearchParams) => void;
}

const SearchFilters = memo(({
  s,
  classTypes,
  subjects,
  tuitionms,
  initialParams = {},
  onSearch
}: SearchFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filter values
  const [filters, setFilters] = useState<ISearchParams>({
    ...initialParams,
    ...initialParams,
    location: initialParams.location || searchParams.get('location') || '',
    ClassTypeId: Number(initialParams.ClassTypeId) || Number(searchParams.get('classTypeId')) || 0,
    SubjectId: Number(initialParams.SubjectId) || Number(searchParams.get('subjectId')) || 0,
    tutionplace: (initialParams.tutionplace || searchParams.get('tutionplace') || ETuitionStyle.ANY) as ETuitionStyle,
    TuitionmId: Number(initialParams.TuitionmId) || Number(searchParams.get('tuitionmId')) || 0,
    page: 1,
  });

  // Update URL when filters change
  const updateURL = useCallback((newFilters: ISearchParams) => {
    const params = new URLSearchParams();
    if (newFilters.location) params.set('location', newFilters.location);
    if (newFilters.ClassTypeId && newFilters.ClassTypeId !== 0) params.set('classTypeId', newFilters.ClassTypeId.toString());
    if (newFilters.SubjectId && newFilters.SubjectId !== 0) params.set('subjectId', newFilters.SubjectId.toString());
    if (newFilters.tutionplace && newFilters.tutionplace !== ETuitionStyle.ANY) params.set('tutionplace', newFilters.tutionplace);
    if (newFilters.TuitionmId && newFilters.TuitionmId !== 0) params.set('tuitionmId', newFilters.TuitionmId.toString());
    if (newFilters.sort) params.set('sort', newFilters.sort);

    const queryString = params.toString();
    router.push(queryString ? `/teacher-search?${queryString}` : '/teacher-search', { scroll: false });
  }, [router]);

  // Handle filter changes
  const handleFilterChange = useCallback((key: keyof ISearchParams, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value, page: 1 };
      updateURL(newFilters);
      return newFilters;
    });
  }, [updateURL]);

  // Handle location change
  const handleLocationChange = useCallback((location: string | null) => {
    handleFilterChange('location', location || '');
  }, [handleFilterChange]);

  // Handle search submit
  const handleSearch = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearch(filters);
  }, [filters, onSearch]);

  // Sync with URL on mount
  useEffect(() => {
    const location = searchParams.get('location');
    const classTypeId = searchParams.get('classTypeId');
    const subjectId = searchParams.get('subjectId');
    const tutionplace = searchParams.get('tutionplace');
    const tuitionmId = searchParams.get('tuitionmId');
    const sort = searchParams.get('sort');

    setFilters(prev => ({
      ...prev,
      location: location || prev.location,
      ClassTypeId: classTypeId ? Number(classTypeId) : prev.ClassTypeId,
      SubjectId: subjectId ? Number(subjectId) : prev.SubjectId,
      tutionplace: (tutionplace as ETuitionStyle) || prev.tutionplace,
      TuitionmId: tuitionmId ? Number(tuitionmId) : prev.TuitionmId,
      sort: sort || prev.sort,
    }));
  }, [searchParams]);

  return (
    <form onSubmit={handleSearch} className={s.filterBar}>
      <div className={s.filterLabel}>Find Your Teacher</div>
      <div className={s.filterRow}>
        {/* Location */}
        <div className={s.filterSelect}>
          <LocationAutocomplete
            onLocationChange={handleLocationChange}
            placeholder="Location"
            s={s}
            initialValue={filters.location}
          />
        </div>

        {/* Tuition Style */}
        <FilterSelect
          s={s}
          label="Tuition Style"
          icon={null}
          options={[
            { id: ETuitionStyle.ANY, name: 'Any Style' },
            { id: ETuitionStyle.ONLINE, name: 'Online' },
            { id: ETuitionStyle.SL, name: 'Student Location' },
            { id: ETuitionStyle.TL, name: 'Teacher Location' },
          ]}
          value={filters.tutionplace}
          onChange={(value) => handleFilterChange('tutionplace', value)}
        />

        {/* Medium */}
        <FilterSelect
          s={s}
          label="Medium"
          icon={null}
          options={[
            { id: 0, name: 'Any Medium' },
            ...(tuitionms || []).map(t => ({ id: t.id, name: t.name }))
          ]}
          value={filters.TuitionmId}
          onChange={(value) => handleFilterChange('TuitionmId', Number(value))}
        />

        {/* Class */}
        <FilterSelect
          s={s}
          label="Class"
          icon={null}
          options={[
            { id: 0, name: 'Any Class' },
            ...(classTypes || []).map(ct => ({ id: ct.id, name: ct.name }))
          ]}
          value={filters.ClassTypeId}
          onChange={(value) => handleFilterChange('ClassTypeId', Number(value))}
        />

        {/* Subject */}
        <FilterSelect
          s={s}
          label="Subject"
          icon={null}
          options={[
            { id: 0, name: 'Any Subject' },
            ...(subjects || []).map(s => ({ id: s.id, name: s.name }))
          ]}
          value={filters.SubjectId}
          onChange={(value) => handleFilterChange('SubjectId', Number(value))}
        />

        <button type="submit" className={s.searchBtn}>
          <SearchIcon />
          Search
        </button>
      </div>
    </form>
  );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters;