import { memo, useMemo } from "react";
import StatItem from "./StatItem";

const StatsBanner = memo(({s}:{s: Record<string, string>}) => {
    const stats = useMemo<{number: string, label: string}[]>(() => [
      { number: "15K+", label: "Active Students" },
      { number: "480+", label: "Expert Courses" },
      { number: "98%", label: "Success Rate" },
      { number: "24/7", label: "Support" }
    ], []);
  
    return (
      <section className={s.statsBanner}>
        <div className="container-xl px-4 px-lg-5">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-lg-3">
                <StatItem {...stat} s={s} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  });
  
  StatsBanner.displayName = 'StatsBanner';


  export default StatsBanner;