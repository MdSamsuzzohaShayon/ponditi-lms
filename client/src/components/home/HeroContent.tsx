// ─────────────────────────────────────────────
//  HERO CONTENT COMPONENT
// ─────────────────────────────────────────────

import { ETuitionStyle, IClassType, IFilterOption, ISubject, ITuitionm} from "@/types";
import React, { memo, useCallback, useState } from "react";
import FilterSelect from "./FilterSelect";
import SearchIcon from "../icons/SearchIcon";
import LocationAutocomplete from "../ui/LocationAutocomplete";
import { useAppSelector } from "@/redux/store";
import axios from "@/config/axios";

/**
 * Previous code
 * https://github.com/MdSamsuzzohaShayon/ponditi-lms/blob/68085d9f1e77929ba99b5affff565f0544df6746/client/components/search/SearchForm.jsx
 */

interface HeroContentProps {
    s: Record<string, string>;
    // filterData: IFilterOption[];
    classTypes: IClassType[]; subjects: ISubject[]; tuitionms: ITuitionm[];
}

const tuitionStyleOptions = [{id: ETuitionStyle.ANY, name:  ETuitionStyle.ANY}
    , {id: ETuitionStyle.ONLINE, name:  ETuitionStyle.ONLINE}, 
    {id: ETuitionStyle.SL, name:  "Student's Location"},
     {id: ETuitionStyle.TL, name:  "Teacher's Location"}]

const HeroContent = ({ classTypes, subjects, tuitionms, s }: HeroContentProps) => {

    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const searchParams = useAppSelector((state) => state.search.searchParams);


    const handleLocationChange = useCallback((location: string | null) => {
        setSelectedLocation(location);
        console.log("Location selected:", location); // You can see the selected value here
        // You can now use this location in your search logic, e.g., dispatch to Redux
        // dispatch(setSearchParams({ location: location }));
    }, []);

    const searchTeacherHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          const response = await axios.get('/search/teacher', {
            params: searchParams,
          });
          if (response.status === 200) {
            // dispatch(setSearchAllUserList(response.data.teachers));
            // // rpStart: 0, // rp = result pagination
            // dispatch(setRPStart(0));
            // // rpCurrentPage: 1,
            // dispatch(setRPCurrentPage(1));
            // // searchUserList: [],
            // const displayableItems = response.data.teachers.slice(rpStart, rpTotal);
            // dispatch(setSearchUserList(displayableItems));
            // // rpTotalPage: 1,
            // dispatch(setRPTotalPage(Math.ceil(response.data.teachers.length / rpTotal)));
          } else if (response.status === 204) {
            window.localStorage.removeItem('search');
            // dispatch(setErrorList(['No teacher found']));
            // dispatch(resetSearchUserList());
          }
        } catch (error) {
          console.log(error);
        //   window.localStorage.removeItem('search');
        //   if (error?.response?.data?.msg) {
        //     dispatch(setErrorList([error.response.data.msg]));
        //   }
        }
      };


    return (
        <div className={s.heroContent}>
            <div className={`${s.helloBadge} ${s.fadeUp}`}>Hello! I'm Master</div>

            <h1 className={`${s.heroHeading} ${s.fadeUp} ${s.d1}`}>
                Promoting<br />
                <span className={s.headingAccent}>Insight</span> &amp; Personal<br />
                Excellence
            </h1>

            <p className={`${s.heroSub} ${s.fadeUp} ${s.d2}`}>
                Transformative education for those who learn differently — discover your path to brilliance.
            </p>

            <a href="#" className={`d-inline-flex align-items-center gap-2 text-decoration-none ${s.heroCta} ${s.fadeUp} ${s.d3}`}>
                <span className={s.ctaArrowCircle}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="7" x2="12" y2="7" />
                        <polyline points="8,3 12,7 8,11" />
                    </svg>
                </span>
                <span>All Courses</span>
            </a>

            {/* Filter Bar */}
            <div className={`${s.filterBar} ${s.fadeUp} ${s.d4}`}>
                <div className={s.filterLabel}>Find Your Tutor</div>
                <div className={s.filterRow}>
                    {/* {filterData.map(f => (
                        <FilterSelect s={s} key={f.label} label={f.label} icon={f.icon} options={f.options} />
                    ))} */}
                    <div className={`position-relative w-100 ${s.filterSelect}`}>
                        <LocationAutocomplete
                            onLocationChange={handleLocationChange}
                            placeholder="Location"
                            s={s}

                        />
                    </div>
                    <FilterSelect s={s} key="tuition-style" label="Tuition Style" icon={null} options={tuitionStyleOptions} />
                    <FilterSelect s={s} key="medium" label="Medium" icon={null} options={(tuitionms || []).map((t) => ({id: t.id, name: t.name}))} />
                    <FilterSelect s={s} key="class" label="Class" icon={null} options={(classTypes || []).map(ct => ({id: ct.id, name: ct.name}))} />
                    <FilterSelect s={s} key="subject" label="Subject" icon={null} options={(subjects || []).map((s) => ({id: s.id, name: s.name}))} />
                    <button className={s.searchBtn}>
                        <SearchIcon />
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}



export default HeroContent;