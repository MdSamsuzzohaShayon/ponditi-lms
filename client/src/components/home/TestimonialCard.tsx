import { memo } from "react";
import QuoteIcon from "../icons/QuoteIcon";
import StarIcon from "../icons/StarIcon";

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    rating: number;
    s: Record<string, string>
}

const TestimonialCard = memo(({ s, quote, author, role, avatar, rating }: TestimonialCardProps) => (
    <div className={s.testimonialCard}>
        <QuoteIcon />
        <p className={s.testimonialQuote}>{quote}</p>
        <div className="d-flex align-items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
            ))}
        </div>
        <div className="d-flex align-items-center gap-3">
            <img src={avatar} alt={author} className={s.testimonialAvatar} loading="lazy" />
            <div>
                <div className={s.testimonialAuthor}>{author}</div>
                <div className={s.testimonialRole}>{role}</div>
            </div>
        </div>
    </div>
));

TestimonialCard.displayName = 'TestimonialCard';


export default TestimonialCard;
