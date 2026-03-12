import { ICategory, ICourse, IFilterOption, IInstructor, ITestimonial } from "@/types";

export const filterData: IFilterOption[] = [
    // 'LocationIcon'
    { label: "Location", icon: null, options: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Remote"] },
    { label: "Tuition Style", icon: null, options: ["One-to-One", "Group Tuition", "Online Live", "Recorded", "Hybrid"] },
    { label: "Medium", icon: null, options: ["Bangla", "English", "Bangla & English"] },
    { label: "Class", icon: null, options: ["Class 1–5", "Class 6–8", "SSC (9–10)", "HSC (11–12)", "University", "Skills"] },
    { label: "Subject", icon: null, options: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Bangla", "ICT", "All Subjects"] },];

export const categories: ICategory[] = [
    { icon: "📐", title: "Mathematics", courses: 156, color: "rgba(62,200,120,0.1)" },
    { icon: "🔬", title: "Science", courses: 142, color: "rgba(74,61,143,0.1)" },
    { icon: "💻", title: "Programming", courses: 98, color: "rgba(245,200,66,0.1)" },
    { icon: "🌍", title: "Languages", courses: 87, color: "rgba(62,200,120,0.1)" },
    { icon: "🎨", title: "Arts", courses: 64, color: "rgba(74,61,143,0.1)" },
    { icon: "📊", title: "Business", courses: 112, color: "rgba(245,200,66,0.1)" },
]

export const popularCourses: ICourse[] = [
    {
        title: "Advanced Mathematics",
        students: "1.2k",
        rating: 4.9,
        price: 89,
        level: "Advanced",
        instructor: { name: "Dr. Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format"
    },
    {
        title: "Physics Fundamentals",
        students: "890",
        rating: 4.8,
        price: 69,
        level: "Beginner",
        instructor: { name: "Prof. James Wilson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&auto=format"
    },
    {
        title: "English Literature",
        students: "2.1k",
        rating: 4.9,
        price: 79,
        level: "Intermediate",
        instructor: { name: "Emma Thompson", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format"
    },
    {
        title: "Web Development",
        students: "3.4k",
        rating: 5.0,
        price: 99,
        level: "All Levels",
        instructor: { name: "Alex Rivera", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format"
    }
]

export const testimonials: ITestimonial[] = [
    {
        quote: "The personalized approach transformed my understanding of complex topics. My tutor adapted perfectly to my learning style.",
        author: "Priya Rahman",
        role: "Medical Student",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        rating: 5
    },
    {
        quote: "Found the perfect mentor for my programming journey. The one-on-one sessions were invaluable for my career growth.",
        author: "Tanvir Hasan",
        role: "Software Engineer",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        rating: 5
    },
    {
        quote: "My daughter's confidence in mathematics has skyrocketed. The tutors are patient, knowledgeable, and truly caring.",
        author: "Farida Begum",
        role: "Parent",
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        rating: 5
    }
]

export const instructors: IInstructor[] = [
    {
        name: "Dr. Sarah Chen",
        role: "Mathematics Expert",
        students: "2.5k",
        courses: 12,
        subjects: ["Calculus", "Algebra", "Statistics"],
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Prof. James Wilson",
        role: "Physics Specialist",
        students: "1.8k",
        courses: 8,
        subjects: ["Mechanics", "Quantum", "Thermodynamics"],
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Emma Thompson",
        role: "Literature Professor",
        students: "2.1k",
        courses: 10,
        subjects: ["Poetry", "Prose", "Drama"],
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        name: "Alex Rivera",
        role: "Tech Lead",
        students: "3.2k",
        courses: 15,
        subjects: ["React", "Python", "Node.js"],
        image: "https://randomuser.me/api/portraits/men/46.jpg"
    }
]
